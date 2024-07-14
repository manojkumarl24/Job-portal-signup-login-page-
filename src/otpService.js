import axios from 'axios';

export const sendOtp = async (email) => {
  try {
    const response = await axios.post('http://localhost:4001/send-otp', { email });
    return response; // Return the response object
  } catch (error) {
    throw new Error('Failed to send OTP');
  }
};

export const verifyOtp = async (email, otp) => {
  try {
    const response = await axios.post('http://localhost:4001/verify-otp', { email, otp });
    return response;
  } catch (error) {
    throw new Error('Invalid OTP');
  }
};
