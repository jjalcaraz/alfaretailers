# Google Analytics Setup Guide for Alfa Retailers

## ✅ **Setup Complete Status**

### **1. Google Analytics Implementation Status**
- ✅ GA4 tracking component created and enhanced
- ✅ Custom event tracking implemented
- ✅ Contact form lead submission tracking
- ✅ Income calculator usage tracking
- ✅ Cookie compliance configured

### **2. Environment Configuration Required**

Add your Measurement ID to Vercel:
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## **Step-by-Step Setup Instructions**

### **Step 1: Create Google Analytics 4 Property**

1. **Visit Google Analytics**: https://analytics.google.com
2. **Sign in** with your Google account
3. **Create Account**:
   - Account Name: "Alfa Retailers"
   - Country: United States
   - Data sharing: Check all boxes except "Technical support"

4. **Create Property**:
   - Property Name: "Alfa Retailers Website"
   - Time Zone: "United States - Central Time"
   - Currency: "USD"

5. **Create Data Stream**:
   - Platform: "Web"
   - Website URL: `https://www.alfaretailers.com`
   - Stream Name: "Alfa Retailers Website"
   - Enhanced Measurement: Keep enabled

6. **Copy your Measurement ID** (Format: `G-XXXXXXXXXX`)

### **Step 2: Configure Vercel Environment Variables**

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your "alfaretailers" project**
3. **Settings → Environment Variables**
4. **Add Variable**:
   - Name: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - Value: `G-XXXXXXXXXX` (your actual Measurement ID)
   - Environments: Production, Preview, Development

### **Step 3: Set Up Google Search Console Integration**

1. **In Google Analytics**: Admin → Data Streams → Your Stream → Configure Google Signals
2. **Enable Google Signals** for better cross-device tracking
3. **Link to Google Search Console**:
   - Admin → Property → Product Links
   - Search Console → Link
   - Select your domain: `www.alfaretailers.com`

### **Step 4: Configure Conversion Tracking**

1. **In Google Analytics**: Admin → Conversions
2. **Create Custom Conversions**:
   - **Lead Generation**: Event name = `lead_submission`
   - **Income Calculator**: Event name = `income_calculation`

### **Step 5: Test Your Setup**

1. **Deploy to production**: Your tracking only works in production
2. **Visit your website**: https://www.alfaretailers.com
3. **Check Real-time reports** in Google Analytics
4. **Test contact form** to verify lead tracking
5. **Test income calculator** to verify event tracking

## **Custom Events Already Implemented**

### **Lead Submission Tracking**
```javascript
// Tracked automatically when contact form is submitted
trackLeadSubmission(email, phone)
```

### **Income Calculator Tracking**
```javascript
// Tracked when income calculation is performed
trackIncomeCalculation(monthlyIncome)
```

### **Page View Tracking**
```javascript
// Automatic page views with proper URL configuration
trackPageView(url, title)
```

## **Important Settings**

### **1. Data Retention**
- Set event data retention to 14 months (maximum)
- Enable user data retention for attribution

### **2. Exclude Internal Traffic**
1. **Admin → Data Streams → Your Stream → Configure tag settings**
2. **Define internal traffic** using your office IP
3. **Apply filter to exclude internal traffic**

### **3. Enhanced Measurement**
The following are automatically tracked:
- Page views
- Scroll tracking (90% scroll depth)
- Outbound clicks
- File downloads
- Video engagement
- Site search

## **Key Reports to Monitor**

### **1. Acquisition Reports**
- User acquisition
- Traffic acquisition
- Google organic traffic

### **2. Engagement Reports**
- Events (lead_submissions, income_calculations)
- Conversions
- Pages and screens

### **3. Demographics Reports**
- User demographics (if Google Signals enabled)
- Geographic data

### **4. Technical Reports**
- Page speed
- Browser and device usage
- Mobile app reports (if applicable)

## **Privacy and Compliance**

### **GDPR/CCPA Compliance**
- Cookie consent banner recommended
- Data processing agreements in place with Google
- User data anonymization available

### **Cookie Configuration**
- SameSite=Lax;Secure cookies
- No personal data collected without consent
- IP anonymization available

## **Troubleshooting**

### **Common Issues**

1. **No data showing in reports**
   - Check environment variables are set in Vercel
   - Verify measurement ID is correct
   - Ensure website is deployed to production

2. **Real-time reports not working**
   - Wait 15-30 minutes for data processing
   - Check ad blockers are disabled
   - Verify you're on production domain

3. **Conversions not tracking**
   - Ensure conversions are properly configured
   - Check event names match exactly
   - Verify custom events are firing

### **Verification Steps**

1. **Google Tag Assistant**: https://tagassistant.google.com/
2. **View page source**: Look for gtag script
3. **Network tab**: Check for GA requests
4. **Console**: Check for JavaScript errors

## **Next Steps**

1. **Set up Google Ads conversion tracking**
2. **Configure Google Search Console integration**
3. **Set up custom dashboards and reports**
4. **Configure email alerts for unusual activity**
5. **Regular monitoring and optimization**

## **Support Resources**

- Google Analytics Help Center
- Google Analytics Academy (free training)
- Measurement Protocol for custom tracking
- Google Analytics Developer Documentation

---

**Note**: This setup ensures GDPR compliance and follows Google Analytics best practices for real estate websites.