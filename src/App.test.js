// src/App.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Registration from './Registration';

test('renders Sign Up heading', () => {
  render(
    <Router>
      <Registration />
    </Router>
  );
  const headingElement = screen.getByText(/Sign Up/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders Job Seeker and Recruiter buttons', () => {
  render(
    <Router>
      <Registration />
    </Router>
  );
  const jobSeekerButton = screen.getByText(/Job Seeker/i);
  const recruiterButton = screen.getByText(/Recruiter/i);
  expect(jobSeekerButton).toBeInTheDocument();
  expect(recruiterButton).toBeInTheDocument();
});

test('renders form for Job Seeker by default', () => {
  render(
    <Router>
      <Registration />
    </Router>
  );
  const nameInput = screen.getByPlaceholderText(/Enter your name/i);
  const emailInput = screen.getByPlaceholderText(/Enter your email/i);
  const mobileInput = screen.getByPlaceholderText(/Enter your mobile number/i);
  const cityInput = screen.getByPlaceholderText(/Enter your current city/i);
  const passwordInput = screen.getByPlaceholderText(/Create your password/i);
  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(mobileInput).toBeInTheDocument();
  expect(cityInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});

test('renders form for Recruiter when Recruiter button is clicked', () => {
  render(
    <Router>
      <Registration />
    </Router>
  );
  const recruiterButton = screen.getByText(/Recruiter/i);
  fireEvent.click(recruiterButton);
  const companyNameInput = screen.getByPlaceholderText(/Enter your company name/i);
  const companyEmailInput = screen.getByPlaceholderText(/Enter your company email/i);
  const companyPasswordInput = screen.getByPlaceholderText(/Create your password/i);
  expect(companyNameInput).toBeInTheDocument();
  expect(companyEmailInput).toBeInTheDocument();
  expect(companyPasswordInput).toBeInTheDocument();
});

test('renders social media login buttons', () => {
  render(
    <Router>
      <Registration />
    </Router>
  );
  const googleButton = screen.getByText(/Continue with Google/i);
  const facebookButton = screen.getByText(/Continue with Facebook/i);
  const linkedInButton = screen.getByAltText(/Sign in with LinkedIn/i);
  expect(googleButton).toBeInTheDocument();
  expect(facebookButton).toBeInTheDocument();
  expect(linkedInButton).toBeInTheDocument();
});

test('renders Log In link', () => {
  render(
    <Router>
      <Registration />
    </Router>
  );
  const loginLink = screen.getByText(/Log In/i);
  expect(loginLink).toBeInTheDocument();
});
