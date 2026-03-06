# Alfa Retailers Property Co-listing Service

Transform your stagnant long-term rental properties into profitable short-term rentals with our comprehensive management service.

## 🚀 Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Vercel account (for deployment)

### Installation

1. Clone the repository
   ```bash
   git clone [repository-url]
   cd alfaretailers
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env.local
   ```
   Fill in your environment variables in `.env.local`

4. Set up the database
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. Run the development server
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser

## 🛠 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Database**: [Neon](https://neon.tech/) (PostgreSQL) - Free tier
  - Alternatives: PlanetScale (MySQL), Turso (SQLite), Supabase (if account available)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Shadcn/ui](https://ui.shadcn.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Deployment**: [Vercel](https://vercel.com/)

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── forms/            # Form components
│   ├── layout/           # Layout components
│   └── sections/         # Landing page sections
├── lib/                   # Utilities
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript definitions
└── styles/                # Global styles
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run db:push` - Push database schema to Supabase
- `npm run db:studio` - Open Prisma Studio
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations

## 🏗 Development

### Database Changes

1. Modify `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name [migration-name]`
3. Run `npx prisma generate`

### Adding New Components

1. Create component in appropriate directory under `src/components/`
2. Follow existing patterns and use TypeScript
3. Export from index files if needed

### API Routes

Create API routes in `src/app/api/` directory following Next.js 13+ app router patterns.

## 🚀 Deployment

This project is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard (including bot prevention keys)
3. Deploy automatically on push to main branch

### Required Environment Variables

See `.env.example` for all required environment variables including:
- Database connection (DATABASE_URL)
- Email service (RESEND_API_KEY)
- Bot prevention (TURNSTILE_SECRET_KEY, NEXT_PUBLIC_TURNSTILE_SITE_KEY, CONTACT_FORM_TOKEN_SECRET)

## 📊 Analytics

- **Vercel Analytics**: Core metrics and web vitals
- **PostHog**: User behavior and conversion tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

[Your License Here]

## 📞 Contact

- Website: [alfaretailers.com](https://alfaretailers.com)
- Email: [your-email@alfaretailers.com](mailto:your-email@alfaretailers.com)

---

*Built with ❤️ for property owners looking to maximize their rental income*