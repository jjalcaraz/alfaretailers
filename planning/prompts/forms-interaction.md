# Forms & User Interaction Prompts

## 1. Multi-Step Application Form
```
Create a multi-step property application form using React Hook Form and Zod:

Step 1: Property Details
- Address with Google Places autocomplete
- Property type dropdown (apartment, house, condo, townhouse, villa)
- Bedroom selector (1-10)
- Bathroom selector (1-10)
- Square footage input
- Amenities checkboxes (wifi, parking, pool, gym, etc.)

Step 2: Current Situation
- How long has property been listed (slider: 1-365 days)
- Current asking price for long-term rental
- Any current bookings or issues
- Reason for listing

Step 3: Owner Information
- First name, last name
- Email and phone number
- Preferred contact method (email/phone/text)
- Property access notes
- Expected timeline

Step 4: Photo Upload
- Drag and drop area for property photos
- Support multiple images
- Image preview and removal
- Progress indicators
- Document upload (optional)

Requirements:
- Progress indicator showing current step
- Form validation with helpful error messages
- Save draft functionality in localStorage
- Mobile-optimized layout
- Full accessibility compliance (WCAG 2.1)
- Smooth transitions between steps
- Auto-save on each step completion
```

## 2. Contact Form Component
```
Build a responsive contact form component with:

Fields:
- Name (required)
- Email (required, validation)
- Phone (optional, format validation)
- Subject dropdown (general inquiry, property question, partnership)
- Message textarea (required, min/max length)
- Privacy policy checkbox (required)

Features:
- Real-time validation feedback
- Loading state during submission
- Success/error messages
- Character count for message field
- Auto-focus on first error
- Mobile-friendly keyboard types
```

## 3. Newsletter Signup
```
Create a newsletter signup component for the footer:

Fields:
- Email input with validation
- Subscribe button
- Optional: Name field

Features:
- Inline validation
- Success message
- Error handling
- Minimal design
- GDPR compliance checkbox if needed
```

## 4. Quick Quote Form
```
Build a simplified "quick quote" form for sidebar or popups:

Fields:
- Property address
- Property type
- Number of bedrooms
- Email
- Phone

Features:
- Single page layout
- Quick validation
- Get Quote button with loading state
- Thank you message
- Option to schedule a call
```

## 5. Form Validation Schemas (Zod)
```
Create comprehensive Zod schemas for all forms including:

Property Application Schema:
- All fields with proper types and validation
- Custom validation rules
- Error messages
- Transform functions for data formatting

Contact Form Schema:
- Email validation with regex
- Phone number validation (E.164 format)
- Message length limits
- Required field validation

Include TypeScript type exports for use in components.
```