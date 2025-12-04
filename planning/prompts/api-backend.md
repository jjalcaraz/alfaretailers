# API & Backend Development Prompts

## 1. Application Submission API
```
Create a Next.js API route for handling property applications:

POST /api/applications

Requirements:
- Validate request body using Zod schema matching the multi-step form
- Sanitize all inputs (XSS prevention)
- Save to Supabase database using Prisma with proper error handling
- Generate unique application ID
- Send notification email using Resend to admin
- Send confirmation email to property owner
- Rate limiting (max 5 submissions per hour per IP/email)
- Log all submissions for analytics
- Handle file uploads to Supabase Storage
- Return structured JSON response

Success response: { success: true, applicationId: string }
Error response: { success: false, error: string, field?: string }

Include: comprehensive error handling, TypeScript types, and API documentation.
```

## 2. Contact Form API
```
Create API endpoint for contact form submissions:

POST /api/contact

Requirements:
- Input validation with Zod
- Spam protection (reCAPTCHA or custom)
- Email sending via Resend
- Auto-responder setup
- Rate limiting
- IP logging for security
- Store submissions in database for follow-up
- Webhook integration option for CRM

Features:
- Different email templates based on subject
- Attachment support
- Auto-routing to different team members
- Slack/Discord notification integration
```

## 3. Income Calculator API
```
Create API for property income estimation:

GET /api/income-estimate?city=...&bedrooms=...&type=...

Requirements:
- Return estimated monthly income
- Include confidence score
- Provide market data
- Seasonal adjustments
- Comparable properties data
- Update frequency information

Response format:
{
  estimatedMonthlyIncome: number,
  confidenceScore: number,
  marketData: {
    averageDailyRate: number,
    occupancyRate: number,
    seasonalMultiplier: number
  },
  lastUpdated: string
}
```

## 4. Admin Dashboard APIs
```
Create secure admin API endpoints:

GET /api/admin/applications
- List all applications with pagination
- Filtering by status, date range, location
- Search functionality
- Export to CSV/Excel

PUT /api/admin/applications/[id]
- Update application status
- Add notes
- Assign to team member
- Send follow-up emails

DELETE /api/admin/applications/[id]
- Soft delete application
- Maintain audit trail

Requirements:
- JWT authentication
- Role-based access control
- Request logging
- Rate limiting
- Input validation
- Error handling
```

## 5. Authentication System
```
Implement NextAuth.js configuration with:

Providers:
- Email/Password (with Supabase adapter)
- Google OAuth
- Microsoft OAuth (optional)

Features:
- Custom login/register pages
- Password reset flow
- Email verification
- Session management
- Protected routes middleware
- Admin role management

Configuration:
- JWT tokens
- Session callbacks
- Database adapter
- Custom pages
- Email templates
```

## 6. File Upload API
```
Create secure file upload endpoints:

POST /api/upload/photos
POST /api/upload/documents

Requirements:
- File type validation (images: jpg, png, webp; docs: pdf, doc)
- File size limits
- Virus scanning (if budget allows)
- Image optimization and resizing
- Generate thumbnails
- CDN integration
- Storage quota management
- Secure URLs with expiration

Features:
- Multiple file upload
- Progress tracking
- Preview generation
- Organization by user/property
- Cleanup of unused files
```

## 7. Webhook Handlers
```
Create webhook handlers for:

- Stripe payments (if implementing payment collection)
- Supabase auth events
- Email service events (bounce, complaint tracking)
- Calendar integrations
- Property listing platforms

Requirements:
- Signature verification
- Idempotency handling
- Error retry logic
- Logging and monitoring
- Event processing queue
```

## 8. Analytics API
```
Build internal analytics API:

GET /api/analytics/dashboard
- Application trends
- Conversion rates
- Property statistics
- Revenue projections
- Geographic distribution

Requirements:
- Date range filtering
- Real-time data
- Caching for performance
- Export capabilities
- Visualization data formats
```

## 9. SEO & Sitemap APIs
```
Create dynamic sitemap generation:

GET /api/sitemap.xml
- Include all public pages
- Add property pages (if applicable)
- Dynamic URLs based on database content
- Update frequency settings
- Priority assignments

Robots.txt API:
- Dynamic generation
- Environment-specific rules
- Crawler instructions
```

## 10. Environment Variables Setup
```
Create comprehensive environment configuration:

Required variables:
- Database URLs
- Supabase keys
- Auth secrets
- Email API keys
- External service keys
- Webhook secrets

Validation:
- Type checking
- Required field validation
- Environment-specific defaults
- Development vs production settings
```