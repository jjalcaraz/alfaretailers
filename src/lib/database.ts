import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

export const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

// Application data interface
export interface ApplicationData {
  firstName: string
  lastName: string
  email: string
  phone: string
  propertyType: string
  address: string
  city: string
  state: string
  zipCode: string
  bedrooms: number
  bathrooms: number
  squareFootage?: number
  yearBuilt: number
  currentlyListed: boolean
  listingDuration?: string
  currentRent?: number
  vacancyMonths?: string
  reasonForVacancy?: string
  furnished: boolean
  amenities?: string[]
  propertyCondition?: string
  photosAvailable: boolean
  accessNotes?: string
  targetIncome?: string
  timeline?: string
  concerns?: string[]
  additionalInfo?: string
}

export async function saveApplication(data: ApplicationData) {
  try {
    // First, find or create the property owner
    let propertyOwner = await prisma.propertyOwner.findUnique({
      where: { email: data.email }
    })

    if (!propertyOwner) {
      propertyOwner = await prisma.propertyOwner.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone
        }
      })
    } else {
      // Update existing owner with latest info
      propertyOwner = await prisma.propertyOwner.update({
        where: { email: data.email },
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          status: 'active'
        }
      })
    }

    // Create or update the property
    const propertyData = {
      ownerId: propertyOwner.id,
      title: `${data.propertyType} in ${data.city}, ${data.state}`,
      address: data.address,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      type: data.propertyType,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      squareFootage: data.squareFootage,
      amenities: data.amenities || [],
      description: `${data.propertyType} with ${data.bedrooms} bed${data.bedrooms > 1 ? 's' : ''} and ${data.bathrooms} bath${data.bathrooms > 1 ? 's' : ''}. ${data.furnished ? 'Furnished' : 'Unfurnished'}. Property condition: ${data.propertyCondition || 'Not specified'}.`,
      photos: [],
      status: 'submitted'
    }

    let property = await prisma.property.findFirst({
      where: {
        ownerId: propertyOwner.id,
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode
      }
    })

    if (!property) {
      property = await prisma.property.create({
        data: propertyData
      })
    } else {
      // Update existing property
      property = await prisma.property.update({
        where: { id: property.id },
        data: {
          ...propertyData,
          status: 'submitted'
        }
      })
    }

    // Create application record
    const application = await prisma.application.create({
      data: {
        propertyId: property.id,
        status: 'pending',
        estimatedMonthlyIncome: calculateEstimatedIncome(data),
        managementFeePercent: 20.0,
        documents: [], // TODO: Handle file uploads
        notes: JSON.stringify({
          currentSituation: {
            currentlyListed: data.currentlyListed,
            listingDuration: data.listingDuration,
            currentRent: data.currentRent,
            vacancyMonths: data.vacancyMonths,
            reasonForVacancy: data.reasonForVacancy
          },
          goalsAndExpectations: {
            targetIncome: data.targetIncome,
            timeline: data.timeline,
            concerns: data.concerns,
            additionalInfo: data.additionalInfo
          },
          propertyFeatures: {
            yearBuilt: data.yearBuilt,
            propertyCondition: data.propertyCondition,
            photosAvailable: data.photosAvailable,
            accessNotes: data.accessNotes
          }
        }, null, 2)
      }
    })

    return {
      success: true,
      applicationId: application.id,
      propertyId: property.id,
      ownerId: propertyOwner.id
    }

  } catch (error) {
    console.error('Database error:', error)
    throw new Error('Failed to save application to database')
  }
}

// Simple income estimation function
function calculateEstimatedIncome(data: ApplicationData): number {
  // Base daily rates by property type
  const baseRates: Record<string, number> = {
    'apartment': 120,
    'house': 200,
    'condo': 150,
    'townhouse': 180,
    'villa': 350,
    'studio': 80,
    'loft': 160,
    'other': 140
  }

  const baseRate = baseRates[data.propertyType] || 120

  // Add bedroom and bathroom premiums
  const bedroomPremium = (data.bedrooms - 1) * 30
  const bathroomPremium = (data.bathrooms - 1) * 15

  // Add amenities premium
  const amenitiesPremium = (data.amenities?.length || 0) * 10

  // Furnished premium
  const furnishedPremium = data.furnished ? 50 : 0

  // Calculate daily rate
  let dailyRate = baseRate + bedroomPremium + bathroomPremium + amenitiesPremium + furnishedPremium

  // Adjust for city (simplified - using a basic multiplier)
  const cityMultipliers: Record<string, number> = {
    'miami': 1.8,
    'new york': 2.2,
    'los angeles': 1.9,
    'chicago': 1.5,
    'houston': 1.3,
    'phoenix': 1.4,
    'philadelphia': 1.4,
    'san antonio': 1.2
  }

  const cityMultiplier = cityMultipliers[data.city.toLowerCase()] || 1.0
  dailyRate *= cityMultiplier

  // Calculate monthly income (assuming 25 days/month, 75% occupancy)
  const monthlyIncome = dailyRate * 25 * 0.75

  return Math.round(monthlyIncome)
}

export async function getApplication(id: string) {
  try {
    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        property: {
          include: {
            owner: true
          }
        }
      }
    })

    return application
  } catch (error) {
    console.error('Database error:', error)
    throw new Error('Failed to retrieve application')
  }
}

export async function getAllApplications() {
  try {
    const applications = await prisma.application.findMany({
      include: {
        property: {
          include: {
            owner: true
          }
        }
      },
      orderBy: {
        submittedAt: 'desc'
      }
    })

    return applications
  } catch (error) {
    console.error('Database error:', error)
    throw new Error('Failed to retrieve applications')
  }
}