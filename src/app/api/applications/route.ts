import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { saveApplication, ApplicationData } from '@/lib/database'

// Validation schema using Zod
const applicationSchema = z.object({
  // Property Owner Information
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),

  // Property Details
  propertyType: z.string().min(1, 'Property type is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'ZIP code is required'),
  bedrooms: z.number().min(0, 'Bedrooms must be 0 or more'),
  bathrooms: z.number().min(0, 'Bathrooms must be 0 or more'),
  squareFootage: z.number().min(0, 'Square footage must be 0 or more').optional(),
  yearBuilt: z.number().min(1800, 'Year built must be valid').max(new Date().getFullYear(), 'Year built cannot be in the future'),

  // Current Situation
  currentlyListed: z.boolean(),
  listingDuration: z.string().optional(),
  currentRent: z.number().min(0, 'Current rent must be 0 or more').optional(),
  vacancyMonths: z.string().optional(),
  reasonForVacancy: z.string().optional(),

  // Property Features
  furnished: z.boolean(),
  amenities: z.array(z.string()).optional(),
  propertyCondition: z.string().optional(),
  photosAvailable: z.boolean(),
  accessNotes: z.string().optional(),

  // Goals & Expectations
  targetIncome: z.string().optional(),
  timeline: z.string().optional(),
  concerns: z.array(z.string()).optional(),
  additionalInfo: z.string().optional(),
})

// Email template for application submission
function createApplicationEmail(data: any) {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Property Application - Alfa Retailers</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f8f9fa; }
        .section { background: white; margin: 20px 0; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .section h2 { color: #2563eb; margin-top: 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; }
        .field { margin: 10px 0; }
        .field strong { color: #374151; display: inline-block; min-width: 200px; }
        .badge { background: #10b981; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
        .highlight { background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 15px 0; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🏠 New Property Application Received</h1>
        <p>Alfa Retailers - Property Co-listing Service</p>
    </div>

    <div class="content">
        <div class="section">
            <h2>👤 Property Owner Information</h2>
            <div class="field"><strong>Name:</strong> ${data.firstName} ${data.lastName}</div>
            <div class="field"><strong>Email:</strong> ${data.email}</div>
            <div class="field"><strong>Phone:</strong> ${data.phone}</div>
        </div>

        <div class="section">
            <h2>🏡 Property Details</h2>
            <div class="field"><strong>Property Type:</strong> ${data.propertyType}</div>
            <div class="field"><strong>Address:</strong> ${data.address}, ${data.city}, ${data.state} ${data.zipCode}</div>
            <div class="field"><strong>Bedrooms:</strong> ${data.bedrooms} | <strong>Bathrooms:</strong> ${data.bathrooms}</div>
            ${data.squareFootage ? `<div class="field"><strong>Square Footage:</strong> ${data.squareFootage} sq ft</div>` : ''}
            <div class="field"><strong>Year Built:</strong> ${data.yearBuilt}</div>
            <div class="field"><strong>Furnished:</strong> ${data.furnished ? 'Yes <span class="badge">Furnished</span>' : 'No <span class="badge">Unfurnished</span>'}</div>
            ${data.amenities && data.amenities.length > 0 ? `
            <div class="field"><strong>Amenities:</strong> ${data.amenities.join(', ')}</div>
            ` : ''}
            <div class="field"><strong>Property Condition:</strong> ${data.propertyCondition || 'Not specified'}</div>
            <div class="field"><strong>Photos Available:</strong> ${data.photosAvailable ? 'Yes' : 'No'}</div>
        </div>

        <div class="section">
            <h2>📊 Current Situation</h2>
            <div class="field"><strong>Currently Listed:</strong> ${data.currentlyListed ? 'Yes' : 'No'}</div>
            ${data.currentlyListed && data.listingDuration ? `<div class="field"><strong>Listing Duration:</strong> ${data.listingDuration}</div>` : ''}
            ${data.currentRent ? `<div class="field"><strong>Current Monthly Rent:</strong> $${data.currentRent.toLocaleString()}</div>` : ''}
            ${data.vacancyMonths ? `<div class="field"><strong>Vacancy Period:</strong> ${data.vacancyMonths}</div>` : ''}
            ${data.reasonForVacancy ? `<div class="field"><strong>Reason for Vacancy:</strong> ${data.reasonForVacancy}</div>` : ''}
        </div>

        <div class="section">
            <h2>🎯 Goals & Expectations</h2>
            ${data.targetIncome ? `<div class="field"><strong>Target Monthly Income:</strong> ${data.targetIncome}</div>` : ''}
            ${data.timeline ? `<div class="field"><strong>Timeline to Start:</strong> ${data.timeline}</div>` : ''}
            ${data.concerns && data.concerns.length > 0 ? `
            <div class="field"><strong>Main Concerns:</strong> ${data.concerns.join(', ')}</div>
            ` : ''}
            ${data.additionalInfo ? `<div class="field"><strong>Additional Information:</strong> ${data.additionalInfo}</div>` : ''}
        </div>

        ${data.accessNotes ? `
        <div class="highlight">
            <strong>🔑 Access Notes:</strong> ${data.accessNotes}
        </div>
        ` : ''}

        <div class="section">
            <h2>📝 Next Steps</h2>
            <p><strong>1. Initial Review:</strong> Review the application for completeness and basic qualification</p>
            <p><strong>2. Property Analysis:</strong> Conduct market analysis and income projection</p>
            <p><strong>3. Contact Owner:</strong> Schedule a consultation within 48 hours</p>
            <p><strong>4. Proposal:</strong> Present management plan and revenue projections</p>
        </div>
    </div>

    <div style="background: #1f2937; color: white; padding: 20px; text-align: center;">
        <p><strong>Application received on:</strong> ${new Date().toLocaleString()}</p>
        <p>Alfa Retailers Property Management</p>
    </div>
</body>
</html>
  `
}

// Simple email sending function (for now, just log to console)
async function sendApplicationEmail(data: any) {
  // In a real implementation, you would use a service like Resend, SendGrid, etc.
  // For now, we'll just log the email to the console
  console.log('📧 APPLICATION EMAIL TEMPLATE:')
  console.log(createApplicationEmail(data))

  // TODO: Integrate with email service
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: 'applications@alfaretailers.com',
  //   to: 'info@alfaretailers.com',
  //   subject: `New Property Application - ${data.firstName} ${data.lastName}`,
  //   html: createApplicationEmail(data),
  // });

  return { success: true, message: 'Email logged to console (implement actual email service)' }
}

// Mock database save function (replace with actual Prisma calls)
async function saveApplicationToDatabase(data: any) {
  // In a real implementation, you would save to your database
  console.log('💾 SAVING APPLICATION TO DATABASE:')
  console.log(JSON.stringify(data, null, 2))

  // TODO: Integrate with Prisma database
  // const application = await prisma.application.create({
  //   data: {
  //     firstName: data.firstName,
  //     lastName: data.lastName,
  //     email: data.email,
  //     phone: data.phone,
  //     // ... all other fields
  //   }
  // });

  return { success: true, message: 'Application data logged to console (implement actual database save)' }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the incoming data
    const validatedData = applicationSchema.parse(body)

    // Save to database using the actual database function
    const dbResult = await saveApplication(validatedData as ApplicationData)

    // Send notification email
    const emailResult = await sendApplicationEmail(validatedData)

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully!',
      data: {
        application: validatedData,
        emailResult,
        dbResult,
        applicationId: dbResult.applicationId
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Application submission error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Validation error',
        errors: error.errors
      }, { status: 400 })
    }

    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Application API endpoint is working',
    timestamp: new Date().toISOString()
  })
}
