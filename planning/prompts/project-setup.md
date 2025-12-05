# Project Setup & Foundation Prompts

## 1. Initial Project Scaffolding
```
Create a Next.js 14 project with the following specifications:
- App Router with TypeScript
- Tailwind CSS for styling
- Supabase for database
- Prisma ORM
- Shadcn/ui components
- Auth configuration
- Basic project structure for a property co-listing service

Include: package.json with all dependencies, folder structure, and setup instructions.
```

## 2. Environment Configuration
```
Set up environment configuration files for Vercel deployment with Supabase, including .env.example template with:
- Database connection strings
- Supabase keys
- Authentication secrets
- Email service (Resend) configuration
- External API keys
- Analytics keys

Also create a comprehensive README with setup instructions.
```

## 3. Initial Database Schema
```
Design and implement a Prisma schema for Alfa Retailers property management:

Entities needed:
- PropertyOwner (contact info, preferences)
- Property (address, details, photos, status)
- Application (link owner to property, with workflow)
- MarketData (for income calculations)

Requirements:
- Include all necessary fields and relationships
- Add indexes for performance
- Implement soft deletes
- Add timestamps for auditing
- Include row-level security considerations
- Add sample data for seeding

Make it production-ready with proper types and constraints.
```