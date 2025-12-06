// Quick test to verify your email configuration
// Run with: node test-email-config.js

const nodemailer = require('nodemailer');

// Replace these with your actual email settings
const config = {
  host: 'your-smtp-server', // Your EMAIL_HOST
  port: 587,              // Your EMAIL_PORT
  secure: false,          // Your EMAIL_SECURE
  auth: {
    user: 'info@alfaretailers.com', // Your EMAIL_USER
    pass: 'your-password'            // Your EMAIL_PASS
  }
};

async function testEmail() {
  try {
    console.log('Testing email configuration...');
    console.log('Host:', config.host);
    console.log('Port:', config.port);
    console.log('User:', config.auth.user);

    const transporter = nodemailer.createTransport(config);

    // Verify connection configuration
    await transporter.verify();
    console.log('✅ SMTP connection successful!');

  } catch (error) {
    console.error('❌ Email configuration error:', error.message);
    console.error('Please check your SMTP settings and try again.');
  }
}

testEmail();