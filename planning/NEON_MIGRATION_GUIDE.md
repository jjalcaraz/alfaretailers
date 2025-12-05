# Neon Database Setup Guide

## Why Neon?
✅ **Free tier with 512MB storage** - Perfect for MVP
✅ **PostgreSQL** - No schema changes needed
✅ **Vercel integration** - Deploy with one click
✅ **3 free projects** - More than enough for dev/staging/prod

## Quick Setup (5 minutes)

### 1. Create Neon Account
1. Go to [neon.tech](https://neon.tech)
2. Click "Sign up" → Use GitHub/Google account
3. Free account automatically created

### 2. Create Database
1. Click "New Project"
2. Name: `alfaretailers`
3. Region: Choose closest to your users (US East recommended)
4. PostgreSQL version: Default (15)
5. Click "Create Project"

### 3. Get Connection String
1. In Neon dashboard, click on your project
2. Go to "Connection Details"
3. Copy the "Connection string"
4. Format: `postgresql://user:password@host/dbname?sslmode=require`

### 4. Update Environment Variables
```bash
# In your .env.local
DATABASE_URL="paste-neon-connection-string-here"
```

### 5. Run Database Migration
```bash
# Push your Prisma schema to Neon
npx prisma db push

# Or if you prefer migrations:
npx prisma migrate dev --name init
```

### 6. Verify Setup
```bash
# Test database connection
npx prisma studio

# Or run development server
npm run dev
```

## Vercel Integration (Optional but Recommended)

### Option A: Through Vercel Dashboard
1. Go to your Vercel project
2. Settings → Environment Variables
3. Add `DATABASE_URL` with Neon connection string
4. Deploy automatically connects

### Option B: Vercel CLI
```bash
vercel env add DATABASE_URL
# Paste your Neon connection string when prompted
```

## Cost Tracking

Your free Neon tier includes:
- 📊 512MB database storage
- 🔄 1GB data transfer/month
- ⚡ 100 concurrent connections
- 🆓 3 projects total

**For Alfa Retailers MVP:**
- Est. storage: 50-100MB (plenty of room)
- Est. data transfer: 100MB/month (well under limits)
- Est. concurrent users: 10-20 (comfortable)

## Troubleshooting

### Connection Issues
- Ensure `sslmode=require` is in connection string
- Check firewall settings
- Verify project is active in Neon dashboard

### Migration Issues
- Run `npx prisma generate` first
- Check Prisma schema matches
- Use `npx prisma db push` for simple changes

### Performance Tips
- Use connection pooling for production
- Enable query logging in development
- Monitor usage in Neon dashboard

## When to Upgrade
- Approaching 400MB storage
- Consistent >50 concurrent users
- Need advanced features like branching

## Next Steps
1. Set up Neon database
2. Update .env.local
3. Run migrations
4. Continue with Step 2: Visual Shell Implementation