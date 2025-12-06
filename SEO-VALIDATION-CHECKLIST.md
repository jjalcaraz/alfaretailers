# 🚀 Alfa Retailers SEO Validation Checklist

## ✅ Pre-Deployment Checklist

### 1. Environment Variables
- [ ] `NEXT_PUBLIC_SITE_URL` is set to `https://www.alfaretailers.com`
- [ ] `GOOGLE_SEARCH_CONSOLE_VERIFICATION` has your actual verification code
- [ ] All business variables are properly configured

### 2. Server Configuration
- [ ] `vercel.json` redirects are configured
- [ ] `middleware.ts` is created and functional
- [ ] SSL certificates are valid for both www and non-www

### 3. Content Files
- [ ] `robots.txt` is updated with preferred domain
- [ ] `sitemap.ts` uses environment variables
- [ ] Canonical URLs are properly configured

## 🔍 Post-Deployment Validation

### 1. Redirect Testing
Run the test script to verify all redirects:

```bash
node scripts/test-seo-redirects.js
```

**Expected Results:**
- [ ] `http://alfaretailers.com` → `https://www.alfaretailers.com` (301)
- [ ] `http://www.alfaretailers.com` → `https://www.alfaretailers.com` (301)
- [ ] `https://alfaretailers.com` → `https://www.alfaretailers.com` (301)
- [ ] `https://www.alfaretailers.com` → `https://www.alfaretailers.com` (200)

### 2. Manual Browser Testing
Test these URLs in your browser:

**Should Redirect to HTTPS://WWW:**
- [ ] `http://alfaretailers.com`
- [ ] `http://www.alfaretailers.com`
- [ ] `https://alfaretailers.com`

**Should Stay the Same:**
- [ ] `https://www.alfaretailers.com`

### 3. View Page Source Validation
Check the HTML source for:

**Canonical Tags:**
- [ ] `<link rel="canonical" href="https://www.alfaretailers.com/" />` (homepage)
- [ ] `<link rel="canonical" href="https://www.alfaretailers.com/about" />` (about page)

**Structured Data:**
- [ ] Organization schema uses `https://www.alfaretailers.com`
- [ ] LocalBusiness schema uses `https://www.alfaretailers.com`
- [ ] WebPage schema uses `https://www.alfaretailers.com`

**Meta Tags:**
- [ ] `og:url` points to `https://www.alfaretailers.com`
- [ ] `twitter:url` points to `https://www.alfaretailers.com`
- [ ] Google verification meta tag is present

### 4. Google Tools Testing

**Rich Results Test:**
1. Go to: https://search.google.com/test/rich-results
2. Test: `https://www.alfaretailers.com`
3. Verify:
   - [ ] No errors detected
   - [ ] Structured data is valid
   - [ ] All URLs in schema use www domain

**PageSpeed Insights:**
1. Go to: https://pagespeed.web.dev/
2. Test both mobile and desktop
3. Verify:
   - [ ] Core Web Vitals score ≥ 90
   - [ ] No redirect chains detected

### 5. HTTP Header Validation
Use browser developer tools or curl to check:

```bash
curl -I https://www.alfaretailers.com
```

**Expected Headers:**
- [ ] `status: 200 OK`
- [ ] `strict-transport-security: max-age=31536000; includeSubDomains; preload`
- [ ] `x-frame-options: DENY`
- [ ] `x-content-type-options: nosniff`
- [ ] `referrer-policy: strict-origin-when-cross-origin`

### 6. Search Engine Verification

**Google Search Console:**
1. Add both `www.alfaretailers.com` and `alfaretailers.com` properties
2. Set `www.alfaretailers.com` as preferred domain
3. Submit sitemap: `https://www.alfaretailers.com/sitemap.xml`
4. Verify:
   - [ ] No duplicate content warnings
   - [ ] No redirect errors
   - [ ] All pages indexed correctly

**Bing Webmaster Tools:**
1. Add `www.alfaretailers.com` property
2. Set as preferred domain
3. Submit sitemap
4. Verify:
   - [ ] No crawl errors
   - [ ] All pages indexed

## 📊 Analytics Setup

### Google Analytics 4
- [ ] Property is set to `www.alfaretailers.com`
- [ ] View settings exclude non-www traffic
- [ ] Enhanced ecommerce tracking enabled
- [ ] Goals configured for conversions

### Google Tag Manager
- [ ] Container uses `{{Page URL}}` variable correctly
- [ ] All tags fire on www domain only
- [ ] Consent mode configured if needed

## 🔧 Ongoing Monitoring

### Weekly Checks:
- [ ] Monitor Google Search Console for issues
- [ ] Check Analytics for traffic patterns
- [ ] Verify no new redirect errors
- [ ] Core Web Vitals remain healthy

### Monthly Checks:
- [ ] Run full redirect test suite
- [ ] Check for broken internal links
- [ ] Review sitemap for new pages
- [ ] Update structured data if needed

## 🚨 Troubleshooting Guide

### Common Issues and Solutions:

**Issue: Redirect loops**
- Check: `vercel.json` and `middleware.ts` for conflicting rules
- Fix: Ensure middleware doesn't double-process www redirects

**Issue: Mixed content warnings**
- Check: All images, scripts, and CSS use HTTPS
- Fix: Update any HTTP resources to HTTPS

**Issue: Canonical tag not appearing**
- Check: Layout component includes canonical URL
- Fix: Ensure CanonicalUrl component is imported

**Issue: Structured data errors**
- Use: Google Rich Results Test
- Fix: Update schema.org markup in enhanced-structured-data.tsx

**Issue: SSL certificate errors**
- Check: Vercel SSL settings
- Fix: Ensure both www and non-www are covered

## 📞 Emergency Contacts

- **Vercel Support**: https://vercel.com/support
- **Google Search Console**: https://support.google.com/webmasters/
- **Domain Registrar**: Your domain provider

## 🔄 Rollback Plan

If issues arise:
1. Revert `vercel.json` to previous version
2. Remove `middleware.ts` temporarily
3. Set `NEXT_PUBLIC_SITE_URL` to working configuration
4. Redeploy and test
5. Gradually reapply changes

---

**Last Updated**: December 2025
**Version**: 1.0