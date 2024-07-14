import React, { useState, useRef } from 'react';
import './Registration.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton } from 'react-social-login-buttons';
import { LinkedIn } from 'react-linkedin-login-oauth2';
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';
import { Link, useNavigate } from 'react-router-dom';
import { sendOtp, verifyOtp } from './otpService'; // Import OTP service

const Registration = () => {
  const [role, setRole] = useState('jobseeker');
  const [showPassword, setShowPassword] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    companyName: '',
    companyEmail: ''
  });
  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState(Array(5).fill(''));
  const otpInputs = useRef([]);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleVerificationClick = async () => {
    if (formData.email) {
      try {
        const response = await sendOtp(formData.email);
        if (response.status === 200) {
          setShowVerification(true);
          setIsEmailVerified(false); // Reset email verification status
          setErrors({}); // Clear any previous errors
        } else {
          setErrors({ ...errors, email: 'Error sending OTP' });
        }
      } catch (error) {
        console.error('Error sending OTP:', error);
        setErrors({ ...errors, email: 'Error sending OTP' });
      }
    } else {
      setErrors({ ...errors, email: 'Please enter a valid email address' });
    }
  };

  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value.length === 1 && index < otpInputs.current.length - 1) {
        otpInputs.current[index + 1].focus();
      }
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && !e.target.value) {
      otpInputs.current[index - 1].focus();
    } else if (e.key === 'ArrowRight' && index < otpInputs.current.length - 1) {
      otpInputs.current[index + 1].focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      otpInputs.current[index - 1].focus();
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (role === 'jobseeker') {
      if (!formData.name) {
        newErrors.name = '*Name is required';
      }
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = '*Valid email is required';
      }
      if (!formData.mobile || !/^\d{10}$/.test(formData.mobile)) {
        newErrors.mobile = '*Valid 10-digit mobile number is required';
      }
      if (!formData.password || formData.password.length < 8) {
        newErrors.password = '*Password must be at least 8 characters long';
      }
    } else if (role === 'recruiter') {
      if (!formData.companyName) {
        newErrors.companyName = '*Company name is required';
      }
      if (!formData.companyEmail || !/\S+@\S+\.\S+/.test(formData.companyEmail)) {
        newErrors.companyEmail = '*Valid company email is required';
      }
      if (!formData.password || formData.password.length < 8) {
        newErrors.password = '*Password must be at least 8 characters long';
      }
    }
    if (!isEmailVerified && !showVerification) {
      newErrors.emailVerification = '*Please verify your email before signing up';
    }
    if (showVerification && otp.some(digit => digit === '')) {
      newErrors.otp = '*Please enter the OTP';
    }

    return newErrors;
  };

  const handleSignUp = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        await verifyOtp(formData.email, otp.join(''));
        setIsEmailVerified(true); // Mark email as verified
        setErrors({}); // Clear any previous errors
        if (role === 'jobseeker') {
          navigate('/home', { state: { name: formData.name } });
        } else if (role === 'recruiter') {
          navigate('/home', { state: { name: formData.companyName } });
        }
      } catch (error) {
        setErrors({ otp: 'Invalid OTP' });
      }
    } else {
      setErrors(validationErrors);
    }
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

  const renderForm = () => {
    if (role === 'jobseeker') {
      return (
        <>
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="input-group">
            <input
              type="text"
              name="mobile"
              placeholder="Enter your mobile number"
              value={formData.mobile}
              onChange={handleInputChange}
            />
            {errors.mobile && <span className="error-message">{errors.mobile}</span>}
          </div>
          <div className="input-group">
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Create your password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <span className="toggle-password" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          <button className="verify-email-button" onClick={handleVerificationClick}>
            Verify Email
          </button>
          {showVerification && (
            <div className="verification-container">
              <div className="verification-code">
                {Array(5).fill('').map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="verification-input"
                    ref={(el) => (otpInputs.current[index] = el)}
                    onChange={(e) => handleOtpChange(e, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                  />
                ))}
              </div>
              <p className="enter-otp-text">Enter OTP</p>
              {errors.otp && <span className="error-message">{errors.otp}</span>}
            </div>
          )}
        </>
      );
    } else if (role === 'recruiter') {
      return (
        <>
          <div className="input-group">
            <input
              type="text"
              name="companyName"
              placeholder="Enter your company name"
              value={formData.companyName}
              onChange={handleInputChange}
            />
            {errors.companyName && <span className="error-message">{errors.companyName}</span>}
          </div>
          <div className="input-group">
            <input
              type="email"
              name="companyEmail"
              placeholder="Enter your company email"
              value={formData.companyEmail}
              onChange={handleInputChange}
            />
            {errors.companyEmail && <span className="error-message">{errors.companyEmail}</span>}
          </div>
          <div className="input-group">
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Create your password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <span className="toggle-password" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          <button className="verify-email-button" onClick={handleVerificationClick}>
            Verify Email
          </button>
          {showVerification && (
            <div className="verification-container">
              <div className="verification-code">
                {Array(5).fill('').map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="verification-input"
                    ref={(el) => (otpInputs.current[index] = el)}
                    onChange={(e) => handleOtpChange(e, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                  />
                ))}
              </div>
              {errors.emailVerification && (
                <div className="error-message">{errors.emailVerification}</div>
              )}
              <p className="enter-otp-text">Enter OTP</p>
              {errors.otp && <span className="error-message">{errors.otp}</span>}
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
        <button className="register-button" onClick={handleSignUp}>Sign Up</button>
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
