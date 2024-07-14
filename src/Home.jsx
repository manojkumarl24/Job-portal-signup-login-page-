import React from 'react';
import { useLocation } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const location = useLocation();
  const { name, email, picture, loginMethod } = location.state || { name: 'Guest' };

  // Check if email is present to determine if logged in with social media
  const loggedInWithSocialMedia = !!email;

  return (
    <div className="home-container">
      <h1>Welcome, {name}!</h1>
      {email && (
        <div className="social-profile">
          <p>Email: {email}</p>
          {picture && <img src={picture} alt={name} className="profile-picture" />}
        </div>
      )}
      {loggedInWithSocialMedia && (
        <p style={{ marginTop: '20px' }}>
          {loginMethod === 'signup' ? 'Signed up with social media' : 'Logged in with social media'}
        </p>
      )}
    </div>
  );
};

export default Home;
