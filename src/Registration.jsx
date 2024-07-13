import React, { useState, useEffect } from 'react';
import './Registration.css';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton } from 'react-social-login-buttons';
import { LinkedIn } from 'react-linkedin-login-oauth2';
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';
import { Link } from 'react-router-dom';
const Registration = () => {
  const [role, setRole] = useState('jobseeker');
  const [showPassword, setShowPassword] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleVerificationClick = () => {
    setShowVerification(true);
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const profile = jwtDecode(credentialResponse.credential);
    console.log(profile);
    // Handle user profile data here
  };

  const handleFacebookSuccess = (response) => {
    const profile = response.data;
    console.log(profile);
    // Handle user profile data here
  };

  useEffect(() => {
    // Any additional side effects
  }, []);

  const renderForm = () => {
    if (role === 'jobseeker') {
      return (
        <>
          <div className="input-group">
            <input type="text" placeholder="Enter your name" />
          </div>
          <div className="input-group">
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className="input-group">
            <input type="text" placeholder="Enter your mobile number" />
          </div>
          <div className="input-group">
            <input type="text" placeholder="Enter your current city" />
          </div>
          <div className="input-group">
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Create your password"
              />
              <span className="toggle-password" onClick={togglePasswordVisibility}>
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </span>
            </div>
          </div>
          <button className="verify-email-button" onClick={handleVerificationClick}>
            Verify Email
          </button>
          {showVerification && (
            <div className="verification-container">
              <div className="verification-code">
                <input type="text" maxLength="1" className="verification-input" />
                <input type="text" maxLength="1" className="verification-input" />
                <input type="text" maxLength="1" className="verification-input" />
                <input type="text" maxLength="1" className="verification-input" />
              </div>
              <p className="enter-otp-text">Enter OTP</p>
            </div>
          )}
        </>
      );
    } else if (role === 'recruiter') {
      return (
        <>
          <div className="input-group">
            <input type="text" placeholder="Enter your company name" />
          </div>
          <div className="input-group">
            <input type="email" placeholder="Enter your company email" />
          </div>
          <div className="input-group">
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Create your password"
              />
              <span className="toggle-password" onClick={togglePasswordVisibility}>
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </span>
            </div>
          </div>
          <button className="verify-email-button" onClick={handleVerificationClick}>
            Verify Email
          </button>
          {showVerification && (
            <div className="verification-container">
              <div className="verification-code">
                <input type="text" maxLength="1" className="verification-input" />
                <input type="text" maxLength="1" className="verification-input" />
                <input type="text" maxLength="1" className="verification-input" />
                <input type="text" maxLength="1" className="verification-input" />
              </div>
              <p className="enter-otp-text">Enter OTP</p>
            </div>
          )}
        </>
      );
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-box">
        <h2>Sign Up</h2>
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
        {renderForm()}
        <button className="register-button">Sign Up</button>
        <div className="separator">----OR----</div>
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
        <p className="login-link">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
