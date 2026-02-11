import nodemailer from 'nodemailer';

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

interface EmailData {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  propertyType?: string;
  bedrooms?: string;
  bathrooms?: string;
  address?: string;
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null;
  private config: EmailConfig;

  constructor() {
    // Default configuration - you can customize these
    this.config = {
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER || 'info@alfaretailers.com',
        pass: process.env.EMAIL_PASS || '', // Use app-specific password for Gmail
      },
    };

    this.initializeTransporter();
  }

  private initializeTransporter() {
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      this.transporter = nodemailer.createTransport({
        host: this.config.host,
        port: this.config.port,
        secure: this.config.secure,
        auth: this.config.auth,
      });

      // Verify connection
      this.transporter.verify((error, success) => {
        if (error) {
          console.error('Email service configuration error:', error);
        } else {
          console.log('Email service is ready to send messages');
        }
      });
    } else {
      console.warn('Email credentials not configured. Emails will not be sent.');
    }
  }

  private escapeHtml(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  private sanitizeSubjectFragment(value: string): string {
    return value.replace(/[\r\n]+/g, ' ').trim();
  }

  private generateContactEmailHTML(data: ContactFormData): string {
    const safeName = this.escapeHtml(data.name);
    const safeEmail = this.escapeHtml(data.email);
    const safePhone = data.phone ? this.escapeHtml(data.phone) : '';
    const safePropertyType = data.propertyType ? this.escapeHtml(data.propertyType) : '';
    const safeBedrooms = data.bedrooms ? this.escapeHtml(data.bedrooms) : '';
    const safeBathrooms = data.bathrooms ? this.escapeHtml(data.bathrooms) : '';
    const safeAddress = data.address ? this.escapeHtml(data.address) : '';
    const safeMessage = this.escapeHtml(data.message).replace(/\n/g, '<br>');
    const replyToEmail = encodeURIComponent(data.email.trim());

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .content {
            background: #f9fafb;
            padding: 30px;
            border-radius: 0 0 10px 10px;
          }
          .field {
            margin-bottom: 20px;
          }
          .field-label {
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 5px;
          }
          .field-value {
            background: white;
            padding: 12px;
            border-radius: 6px;
            border-left: 4px solid #2563eb;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            padding: 20px;
            color: #6b7280;
            font-size: 14px;
          }
          .urgent {
            background: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 15px;
            border-radius: 6px;
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🏠 New Contact Form Submission</h1>
          <p>Alfa Retailers - Property Management Inquiry</p>
        </div>

        <div class="content">
          <div class="urgent">
            <strong>📞 High Priority Lead!</strong><br>
            This potential client is interested in property management services.
          </div>

          <div class="field">
            <div class="field-label">👤 Name:</div>
            <div class="field-value">${safeName}</div>
          </div>

          <div class="field">
            <div class="field-label">📧 Email:</div>
            <div class="field-value">${safeEmail}</div>
          </div>

          ${data.phone ? `
          <div class="field">
            <div class="field-label">📱 Phone:</div>
            <div class="field-value">${safePhone}</div>
          </div>
          ` : ''}

          ${data.propertyType ? `
          <div class="field">
            <div class="field-label">🏘️ Property Type:</div>
            <div class="field-value">${safePropertyType}</div>
          </div>
          ` : ''}

          ${data.bedrooms ? `
          <div class="field">
            <div class="field-label">🛏️ Bedrooms:</div>
            <div class="field-value">${safeBedrooms}</div>
          </div>
          ` : ''}

          ${data.bathrooms ? `
          <div class="field">
            <div class="field-label">🚿 Bathrooms:</div>
            <div class="field-value">${safeBathrooms}</div>
          </div>
          ` : ''}

          ${data.address ? `
          <div class="field">
            <div class="field-label">📍 Property Address:</div>
            <div class="field-value">${safeAddress}</div>
          </div>
          ` : ''}

          <div class="field">
            <div class="field-label">💬 Message:</div>
            <div class="field-value">${safeMessage}</div>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <a href="mailto:${replyToEmail}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              📧 Reply to Client
            </a>
          </div>
        </div>

        <div class="footer">
          <p>This message was sent from the Alfa Retailers website contact form.</p>
          <p>Time received: ${new Date().toLocaleString()}</p>
          <p><a href="https://www.alfaretailers.com">www.alfaretailers.com</a></p>
        </div>
      </body>
      </html>
    `;
  }

  private generateAutoReplyHTML(data: ContactFormData): string {
    const safeName = this.escapeHtml(data.name);

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You - Alfa Retailers</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .content {
            background: #f9fafb;
            padding: 40px 30px;
            border-radius: 0 0 10px 10px;
          }
          .feature-box {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #2563eb;
          }
          .cta-button {
            background: #2563eb;
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 6px;
            display: inline-block;
            font-weight: bold;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding: 20px;
            color: #6b7280;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Thank You, ${safeName}! 🎉</h1>
          <p>Your inquiry has been received</p>
        </div>

        <div class="content">
          <p>Dear ${safeName},</p>

          <p>Thank you for contacting Alfa Retailers! We've received your inquiry and are excited to help you transform your property into a profitable short-term rental.</p>

          <div class="feature-box">
            <h3>📋 What Happens Next?</h3>
            <ul>
              <li>Our property expert will review your information</li>
              <li>You'll receive a response within 24 hours</li>
              <li>We'll provide a free property analysis</li>
              <li>We'll discuss how we can increase your rental income by 40%+</li>
            </ul>
          </div>

          <div class="feature-box">
            <h3>📞 Need Immediate Assistance?</h3>
            <p>Call us directly at <strong>210-526-1401</strong> for immediate consultation.</p>
          </div>

          <div style="text-align: center;">
            <a href="https://www.alfaretailers.com/apply" class="cta-button">
              🚀 Get Your Free Analysis Now
            </a>
          </div>

          <p>We look forward to partnering with you to maximize your property's potential!</p>

          <p><strong>Best regards,</strong><br>
          The Alfa Retailers Team<br>
          📧 info@alfaretailers.com<br>
          📞 210-526-1401</p>
        </div>

        <div class="footer">
          <p><a href="https://www.alfaretailers.com">www.alfaretailers.com</a></p>
          <p>12370 Potranco Rd, Suite 207<br>San Antonio, TX 78254</p>
        </div>
      </body>
      </html>
    `;
  }

  async sendEmail(data: EmailData): Promise<{ success: boolean; message: string }> {
    if (!this.transporter) {
      console.log('Email service not configured, simulating send:', data.subject);
      return {
        success: true,
        message: 'Email service not configured - message would be sent in production'
      };
    }

    try {
      const mailOptions = {
        from: data.from || `"Alfa Retailers" <${this.config.auth.user}>`,
        to: data.to,
        subject: data.subject,
        html: data.html,
        text: data.text || this.htmlToText(data.html),
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', result.messageId);

      return {
        success: true,
        message: 'Email sent successfully'
      };
    } catch (error) {
      console.error('Error sending email:', error);
      return {
        success: false,
        message: `Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  async sendContactNotification(data: ContactFormData): Promise<{ success: boolean; message: string }> {
    const subject = `New Contact Form: ${this.sanitizeSubjectFragment(data.name)} - Property Management Inquiry`;
    const html = this.generateContactEmailHTML(data);

    return this.sendEmail({
      to: 'info@alfaretailers.com',
      subject,
      html,
    });
  }

  async sendAutoReply(data: ContactFormData): Promise<{ success: boolean; message: string }> {
    const subject = 'Thank You for Contacting Alfa Retailers';
    const html = this.generateAutoReplyHTML(data);

    return this.sendEmail({
      to: data.email,
      subject,
      html,
    });
  }

  async sendApplicationNotification(data: any): Promise<{ success: boolean; message: string }> {
    const subject = `New Application: ${data.firstName} ${data.lastName} - ${data.propertyAddress}`;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Property Application</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .field { margin: 15px 0; }
          .label { font-weight: bold; color: #1f2937; }
          .urgent { background: #fef3c7; padding: 15px; border-radius: 6px; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🎯 New Property Application</h1>
        </div>
        <div class="content">
          <div class="urgent">
            <strong>Hot Lead! Complete application received.</strong>
          </div>
          <div class="field"><span class="label">Name:</span> ${data.firstName} ${data.lastName}</div>
          <div class="field"><span class="label">Email:</span> ${data.email}</div>
          <div class="field"><span class="label">Phone:</span> ${data.phone}</div>
          <div class="field"><span class="label">Property Address:</span> ${data.propertyAddress}</div>
          <div class="field"><span class="label">Property Type:</span> ${data.propertyType}</div>
          <div class="field"><span class="label">Bedrooms:</span> ${data.bedrooms}</div>
          <div class="field"><span class="label">Bathrooms:</span> ${data.bathrooms}</div>
          <div class="field"><span class="label">Current Status:</span> ${data.currentStatus}</div>
          <div class="field"><span class="label">Timeline:</span> ${data.timeline}</div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: 'info@alfaretailers.com',
      subject,
      html,
    });
  }

  private htmlToText(html: string): string {
    return html
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();
  }

  public isConfigured(): boolean {
    return !!(process.env.EMAIL_USER && process.env.EMAIL_PASS);
  }

  public getConfigurationInfo(): { configured: boolean; host: string; user: string } {
    return {
      configured: this.isConfigured(),
      host: this.config.host,
      user: this.config.auth.user,
    };
  }
}

export const emailService = new EmailService();
export type { EmailData, ContactFormData };
