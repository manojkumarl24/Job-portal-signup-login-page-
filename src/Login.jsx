import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css'; // Assuming this imports additional styles not handled inline
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton } from 'react-social-login-buttons';
import { LinkedIn } from 'react-linkedin-login-oauth2';
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';
import { Link } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('jobseeker');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const profile = jwtDecode(credentialResponse.credential);
    console.log(profile);
  };

  const handleFacebookSuccess = (response) => {
    const profile = response.data;
    console.log(profile);
  };

  return (
    <div className="login-container">
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>
      <div className="login-box">
        <h2>Log In</h2>

        <div className="role-selection">
          <button
            className={`role-button ${role === 'jobseeker' ? 'active' : ''}`}
            onClick={() => setRole('jobseeker')}
          >
            Job Seeker
          </button>
          <button
            className={`role-button ${role === 'recruiter' ? 'active' : ''}`}
            onClick={() => setRole('recruiter')}
          >
            Recruiter
          </button>
        </div>

        {/* Email input */}
        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            placeholder="Enter your email"
          />
        </div>

        {/* Password input */}
        <div className="input-group">
          <FaLock className="input-icon" />
          <div className="password-wrapper" style={{ position: 'relative', width: '100%' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
            />
            <span
              className="toggle-password"
              onClick={togglePasswordVisibility}
              style={{ position: 'absolute', right: '2px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
            >
              {showPassword ? <FaEyeSlash style={{ color: 'white' }} /> : <FaEye style={{ color: 'white' }} />}
            </span>
          </div>
        </div>

        {/* Log In button */}
        <button
          className="login-button"
          style={{
            backgroundColor: '#2196F3',
            border: 'none',
            color: 'white',
            padding: '10px 20px',
            cursor: 'pointer',
            borderRadius: '5px',
            marginTop: '20px',
            width: '100%',
          }}
        >
          Log In
        </button>

        <div className="separator">----OR----</div>

        {/* Social media sign-in */}
        <div className="social-media-signup">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              console.log('Google Login Failed');
            }}
            style={{ maxWidth: '240px', marginBottom: '10px', cursor: 'pointer' }}
          />
          <LoginSocialFacebook
            appId="2000186957042676"
            onResolve={handleFacebookSuccess}
            onReject={(error) => {
              console.log(error);
            }}
          >
            <FacebookLoginButton
              className="signup-button"
              style={{ maxWidth: '240px', marginBottom: '10px', cursor: 'pointer' }}
            />
          </LoginSocialFacebook>
          <LinkedIn
            clientId="771hrj5jsmah6y"
            redirectUri={`${window.location.origin}/linkedin`}
            onSuccess={(code) => {
              console.log(code);
            }}
            onError={(error) => {
              console.log(error);
            }}
          >
            {({ linkedInLogin }) => (
              <img
                onClick={linkedInLogin}
                src={linkedin}
                alt="Sign in with LinkedIn"
                style={{ maxWidth: '240px', cursor: 'pointer', marginBottom: '10px' }}
                className="signup-button"
              />
            )}
          </LinkedIn>
        </div>

        {/* Sign up link */}
        <p className="signup-link">
          Don't have an account? <Link to="/">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
