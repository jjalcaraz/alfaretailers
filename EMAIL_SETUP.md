# Email Configuration Setup Guide

This guide will help you configure email sending for the AlfaRetailers website so you can receive notifications when potential clients submit contact forms or applications.

## 📧 Email Service Options

### Option 1: Gmail (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Create an App Password**:
   - Go to your Google Account settings
   - Security → 2-Step Verification → App passwords
   - Create a new app password for "Mail"
   - Use the 16-character password provided

3. **Add to `.env.local`**:
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=info@alfaretailers.com
   EMAIL_PASS=your-16-character-app-password
   ```

### Option 2: Outlook/Hotmail

1. **Add to `.env.local`**:
   ```env
   EMAIL_HOST=smtp-mail.outlook.com
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=info@alfaretailers.com
   EMAIL_PASS=your-outlook-password
   ```

### Option 3: Custom SMTP Provider

1. **Get SMTP credentials** from your email provider
2. **Add to `.env.local`**:
   ```env
   EMAIL_HOST=smtp.yourprovider.com
   EMAIL_PORT=465
   EMAIL_SECURE=true
   EMAIL_USER=info@alfaretailers.com
   EMAIL_PASS=your-smtp-password
   ```

### Option 4: Resend API (Third-party)

1. **Sign up** at [resend.com](https://resend.com)
2. **Get your API key**
3. **Add to `.env.local`**:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxxx
   FROM_EMAIL=leads@alfaretailers.com
   ADMIN_EMAIL=info@alfaretailers.com
   ```

## ⚙️ Setup Steps

### 1. Copy Environment Variables

```bash
cp .env.example .env.local
```

### 2. Configure Your Chosen Email Service

Edit `.env.local` and replace the placeholder values with your actual credentials.

### 3. Restart Your Development Server

```bash
npm run dev
```

### 4. Test Email Configuration

```bash
curl http://localhost:3000/api/contact
```

You should see:
```json
{
  "message": "Contact form API endpoint",
  "emailConfigured": true,
  "config": {
    "configured": true,
    "host": "smtp.gmail.com",
    "user": "info@alfaretailers.com"
  }
}
```

## 🧪 Test Email Sending

### Test Contact Form

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "210-555-0123",
    "message": "This is a test email submission."
  }'
```

### Test Application Form

Visit `http://localhost:3000/apply` and submit the application form.

## 📋 What Gets Sent

### Contact Form Submissions
- **Notification Email**: Sent to `info@alfaretailers.com`
- **Auto-Reply**: Sent to the submitter's email
- **Includes**: Name, email, phone, property details, message

### Application Submissions
- **Notification Email**: Sent to `info@alfaretailers.com`
- **Includes**: Complete application data, property details, contact information

## 🔒 Security Features

- **Rate Limiting**: 5 requests per minute per IP
- **Input Validation**: Zod schema validation
- **XSS Protection**: Sanitized HTML content
- **CSRF Protection**: Built-in Next.js protection

## 🚨 Troubleshooting

### Email Not Configured Error
- Make sure you've set `EMAIL_USER` and `EMAIL_PASS` in `.env.local`
- Check that your app password is correct (for Gmail)
- Restart the development server after changing `.env.local`

### Gmail Authentication Failed
- Enable "Less secure app access" in Gmail settings (temporary)
- Or use an App Password (recommended)
- Make sure 2-factor authentication is enabled

### Emails Not Receiving
- Check your spam/junk folder
- Verify the sender email (`info@alfaretailers.com`) is whitelisted
- Check server logs for error messages

### Rate Limiting Issues
- Wait 1 minute after 5 failed attempts
- The rate limiter resets automatically per IP address

## 📊 Email Templates

### Contact Form Email Template
- Professional HTML design with Alfa Retailers branding
- Client information clearly displayed
- "Reply to Client" button for quick response

### Auto-Reply Template
- Professional thank you message
- Next steps explanation
- Company contact information

### Application Email Template
- Detailed application summary
- Property highlights
- Priority lead indicators

## 🔄 Production Deployment

### Environment Variables
For production deployment, make sure to set these environment variables in your hosting platform:

- `EMAIL_HOST`
- `EMAIL_PORT`
- `EMAIL_SECURE`
- `EMAIL_USER`
- `EMAIL_PASS`

### Security Notes
- Never commit `.env.local` to version control
- Use app-specific passwords, not your main account password
- Consider using a dedicated email account for the website
- Regularly update your email credentials

## 📞 Support

If you need help with email configuration:

1. Check the server logs for error messages
2. Verify your SMTP credentials with your email provider
3. Test with a simple email client first
4. Make sure your firewall isn't blocking SMTP ports

---

**Quick Setup Checklist:**
- [ ] Copy `.env.example` to `.env.local`
- [ ] Configure SMTP credentials in `.env.local`
- [ ] Restart development server
- [ ] Test email configuration endpoint
- [ ] Test form submission
- [ ] Verify emails are received

Your email service is now ready to handle all form submissions! 🎉