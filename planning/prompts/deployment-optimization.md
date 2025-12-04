# Deployment & Optimization Prompts

## 1. Production Deployment Setup
```
Prepare the Next.js project for Vercel production deployment:

Create/Update:
1. vercel.json configuration:
   - Function runtime settings
   - Headers for security
   - Redirects for SEO
   - Build optimization settings

2. next.config.js optimizations:
   - Image optimization
   - Bundle analyzer configuration
   - Experimental features
   - Webpack customizations

3. Environment Variables Guide:
   - Production vs Development
   - Security best practices
   - Required variables checklist
   - Setup instructions

4. Build Optimization:
   - Code splitting strategies
   - Static generation vs SSR decisions
   - Caching strategies
   - Bundle size optimization

Include: deployment checklist, rollback procedures, and monitoring setup.
```

## 2. Performance Optimization
```
Optimize the Next.js application for maximum performance:

Frontend Optimizations:
- Implement lazy loading for images and components
- Optimize Core Web Vitals (LCP, FID, CLS)
- Add skeleton loading states
- Implement service worker for caching
- Minimize JavaScript bundle size
- Optimize font loading strategy

Backend Optimizations:
- API route caching strategies
- Database query optimization
- Image CDN integration
- Edge function deployment
- Rate limiting implementation
- Connection pooling

Monitoring:
- Set up Vercel Speed Insights
- Configure Core Web Vitals tracking
- Create performance budgets
- Set up alerting for degradation
```

## 3. Security Hardening
```
Implement comprehensive security measures:

Headers Configuration:
- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

API Security:
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- Rate limiting implementation
- CORS configuration
- HTTPS enforcement

Data Protection:
- Environment variable encryption
- Database encryption at rest
- Secure file upload handling
- PII data protection
- GDPR compliance checklist
```

## 4. Analytics & Monitoring Setup
```
Configure comprehensive monitoring and analytics:

Analytics Integration:
1. Vercel Analytics:
   - Page views tracking
   - Web vitals monitoring
   - Conversion funnel setup
   - Custom event tracking

2. PostHog (or alternative):
   - User journey mapping
   - Feature usage tracking
   - A/B testing setup
   - Session recordings
   - Heatmap configuration

3. Error Monitoring:
   - Sentry integration
   - Custom error logging
   - Performance error tracking
   - Alert configurations

4. Custom Analytics:
   - Lead conversion tracking
   - Form abandonment analysis
   - Geographic distribution
   - Device/browser statistics
```

## 5. CI/CD Pipeline Configuration
```
Set up automated deployment pipeline:

GitHub Actions Workflow:
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main, staging]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run type-check

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

Additional Steps:
- Database migrations
- Environment variable validation
- Post-deployment smoke tests
- Rollback procedures
- Notification setup
```

## 6. SEO & Accessibility Optimization
```
Implement comprehensive SEO and accessibility improvements:

Technical SEO:
- Dynamic sitemap generation
- Robots.txt configuration
- Meta tags optimization
- Structured data implementation
- Open Graph tags
- Twitter Cards
- Canonical URLs

Accessibility (WCAG 2.1 AA):
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance
- Focus management
- Alt text for all images
- Semantic HTML structure

Testing:
- Lighthouse CI integration
- Accessibility testing automation
- SEO audit automation
- Performance regression testing
```

## 7. Scaling Preparation
```
Prepare the application for scale:

Database Optimization:
- Connection pooling
- Read replicas consideration
- Query optimization
- Indexing strategy
- Backup procedures
- Migration strategies

Caching Strategy:
- CDN configuration
- API response caching
- Database query caching
- Static asset caching
- Browser caching headers

Infrastructure:
- Horizontal scaling planning
- Load balancing considerations
- Database scaling options
- Monitoring for high traffic
- Auto-scaling configuration

Business Logic:
- Queue systems for heavy tasks
- Background job processing
- Rate limiting per user
- Feature flag implementation
- Gradual rollout strategies
```

## 8. Backup & Disaster Recovery
```
Implement comprehensive backup strategy:

Database Backups:
- Automated daily backups
- Point-in-time recovery setup
- Backup verification procedures
- Cross-region backup replication
- Restoration testing schedule

Asset Backups:
- User uploaded files backup
- Static assets version control
- Configuration backups
- SSL certificate backups

Recovery Procedures:
- RTO/RPO definitions
- Step-by-step recovery guide
- Communication templates
- Rollback procedures
- Data integrity checks

Testing:
- Monthly disaster recovery drills
- Backup restoration verification
- Failover testing
- Performance impact assessment
```

## 9. Documentation & Handoff
```
Create comprehensive project documentation:

Technical Documentation:
- Architecture overview
- API documentation
- Database schema
- Environment setup guide
- Deployment procedures
- Troubleshooting guide

Business Documentation:
- Feature list with descriptions
- User workflows
- Admin guide
- Metrics definitions
- Business process flows

Development Documentation:
- Contributing guidelines
- Code style guide
- Testing procedures
- Git workflow
- Release process

Include:
- Contact information
- Critical system details
- Third-party dependencies
- License information
- Support procedures
```