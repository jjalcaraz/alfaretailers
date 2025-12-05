import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { emailService } from '@/lib/email';

// Define validation schema for contact form
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  propertyType: z.string().optional(),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  address: z.string().optional(),
});

// Rate limiting storage (in production, use Redis or database)
const rateLimiter = new Map<string, { count: number; lastReset: number }>();

function getClientIdentifier(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] :
               request.headers.get('x-real-ip') ||
               'unknown';
  return ip;
}

function checkRateLimit(identifier: string, maxRequests = 5, windowMs = 60000): boolean {
  const now = Date.now();
  const record = rateLimiter.get(identifier);

  if (!record) {
    rateLimiter.set(identifier, { count: 1, lastReset: now });
    return true;
  }

  // Reset window if expired
  if (now - record.lastReset > windowMs) {
    rateLimiter.set(identifier, { count: 1, lastReset: now });
    return true;
  }

  // Check if over limit
  if (record.count >= maxRequests) {
    return false;
  }

  // Increment count
  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientId = getClientIdentifier(request);
    if (!checkRateLimit(clientId)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many requests. Please try again later.'
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validate input
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: validationResult.error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }

    const formData = validationResult.data;

    // Send notification email to Alfa Retailers
    const notificationResult = await emailService.sendContactNotification(formData);

    if (!notificationResult.success) {
      console.error('Failed to send notification email:', notificationResult.message);
      // Continue anyway - we still want to save the submission
    }

    // Send auto-reply to the user
    const autoReplyResult = await emailService.sendAutoReply(formData);

    if (!autoReplyResult.success) {
      console.error('Failed to send auto-reply email:', autoReplyResult.message);
      // Continue anyway - the main notification was sent
    }

    // Log the submission for tracking
    console.log('Contact form submission received:', {
      name: formData.name,
      email: formData.email,
      timestamp: new Date().toISOString(),
      notificationSent: notificationResult.success,
      autoReplySent: autoReplyResult.success
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for your inquiry! We\'ll get back to you within 24 hours.',
      data: {
        notificationSent: notificationResult.success,
        autoReplySent: autoReplyResult.success
      }
    });

  } catch (error) {
    console.error('Contact form submission error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while processing your request. Please try again.'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Contact form API endpoint',
    emailConfigured: emailService.isConfigured(),
    config: emailService.getConfigurationInfo()
  });
}