require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const PORT = 4001;

app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const otpStore = {}; // Temporary storage for OTPs

app.post('/send-otp', (req, res) => {
  const { email } = req.body;
  console.log('Email:', email); // Debugging line
  const otp = Math.floor(10000 + Math.random() * 90000).toString();
  otpStore[email] = otp;
  console.log('Generated OTP:', otp); // Debugging line

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending OTP:', error); // Debugging line
      res.status(500).send('Error sending OTP');
    } else {
      console.log('OTP sent:', info.response); // Debugging line
      res.status(200).send('OTP sent');
    }
  });
});

app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  console.log('Verifying OTP for:', email); // Debugging line
  if (otpStore[email] === otp) {
    console.log('OTP verified'); // Debugging line
    res.status(200).send('OTP verified');
  } else {
    console.log('Invalid OTP'); // Debugging line
    res.status(400).send('Invalid OTP');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
