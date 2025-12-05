#!/bin/bash

# AlfaRetailers Deployment Validation Script
# Tests the deployed website at https://alfaretailers.vercel.app/

echo "=========================================="
echo "🚀 AlfaRetailers Deployment Validation"
echo "=========================================="
echo ""

BASE_URL="https://alfaretailers.vercel.app"
TIMESTAMP=$(date +"%Y%m%d-%H%M%S")
REPORT_FILE="deployment-report-$TIMESTAMP.txt"

# Initialize report
echo "AlfaRetailers Deployment Validation Report" > $REPORT_FILE
echo "Generated: $TIMESTAMP" >> $REPORT_FILE
echo "=========================================" >> $REPORT_FILE
echo "" >> $REPORT_FILE

# Function to test endpoint
test_endpoint() {
    local url=$1
    local name=$2
    local expected_status=${3:-200}

    echo "Testing: $name"
    echo "URL: $url"

    # Make request and capture response
    response=$(curl -s -w "\nHTTP_STATUS:%{http_code}\nRESPONSE_TIME:%{time_total}" "$url")
    http_code=$(echo "$response" | grep -o 'HTTP_STATUS:[0-9]*' | cut -d: -f2)
    response_time=$(echo "$response" | grep -o 'RESPONSE_TIME:[0-9.]*' | cut -d: -f2)

    if [ "$http_code" -eq "$expected_status" ]; then
        echo "✅ PASS - Status: $http_code, Response time: ${response_time}s"
        echo "✅ $name: OK (HTTP $http_code, ${response_time}s)" >> $REPORT_FILE
    else
        echo "❌ FAIL - Status: $http_code, Response time: ${response_time}s"
        echo "❌ $name: FAILED (HTTP $http_code, ${response_time}s)" >> $REPORT_FILE
    fi
    echo ""

    # Check for common error patterns
    if echo "$response" | grep -qi "404\|not found\|error\|exception"; then
        echo "⚠️  Warning: Potential errors detected in response"
        echo "⚠️  $name: Error patterns detected" >> $REPORT_FILE
    fi
    echo ""
}

# Function to check for specific content
check_content() {
    local url=$1
    local name=$2
    local pattern=$3

    echo "Checking content: $name"
    if curl -s "$url" | grep -q "$pattern"; then
        echo "✅ Content found: $pattern"
        echo "✅ Content check - $name: Found '$pattern'" >> $REPORT_FILE
    else
        echo "❌ Content missing: $pattern"
        echo "❌ Content check - $name: Missing '$pattern'" >> $REPORT_FILE
    fi
    echo ""
}

# Function to test form submission
test_form_submission() {
    echo "Testing form submission endpoint..."

    # Test the /apply endpoint with sample data
    response=$(curl -s -X POST \
        -H "Content-Type: application/json" \
        -d '{
            "firstName": "Test",
            "lastName": "User",
            "email": "test@example.com",
            "phone": "1234567890",
            "businessName": "Test Business",
            "businessType": "retail",
            "monthlyVolume": "10000",
            "yearsInBusiness": "2"
        }' \
        -w "\nHTTP_STATUS:%{http_code}" \
        "$BASE_URL/api/apply")

    http_code=$(echo "$response" | grep -o 'HTTP_STATUS:[0-9]*' | cut -d: -f2)

    if [ "$http_code" -eq 200 ] || [ "$http_code" -eq 201 ]; then
        echo "✅ Form submission working"
        echo "✅ Form submission: Working (HTTP $http_code)" >> $REPORT_FILE
    else
        echo "❌ Form submission failed (HTTP $http_code)"
        echo "❌ Form submission: Failed (HTTP $http_code)" >> $REPORT_FILE
    fi
    echo ""
}

# Function to test database connectivity (via API)
test_database_connectivity() {
    echo "Testing database connectivity..."

    # Try to access a protected endpoint or API that requires database
    response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" "$BASE_URL/api/health" 2>/dev/null)
    http_code=$(echo "$response" | grep -o 'HTTP_STATUS:[0-9]*' | cut -d: -f2)

    if [ -z "$http_code" ]; then
        echo "ℹ️  Health endpoint not available (this is normal if not implemented)"
        echo "ℹ️  Database test: No health endpoint available" >> $REPORT_FILE
    elif [ "$http_code" -eq 200 ]; then
        echo "✅ Database connectivity: OK"
        echo "✅ Database connectivity: OK" >> $REPORT_FILE
    else
        echo "⚠️  Database connectivity check returned HTTP $http_code"
        echo "⚠️  Database connectivity: HTTP $http_code" >> $REPORT_FILE
    fi
    echo ""
}

echo "1. Testing Core Pages"
echo "===================="
echo ""

# Test main pages
test_endpoint "$BASE_URL" "Homepage"
test_endpoint "$BASE_URL/about" "About Page"
test_endpoint "$BASE_URL/how-it-works" "How It Works Page"
test_endpoint "$BASE_URL/faq" "FAQ Page"
test_endpoint "$BASE_URL/contact" "Contact Page"
test_endpoint "$BASE_URL/apply" "Application Page"

echo "2. Testing Static Assets"
echo "======================="
echo ""

# Test for critical static assets
check_content "$BASE_URL" "ALFA RETAILERS Logo" "ALFA RETAILERS"
check_content "$BASE_URL" "Framer Motion" "framer-motion"
check_content "$BASE_URL" "Next.js" "next"

# Test for CSS and JS bundles
test_endpoint "$BASE_URL/_next/static/css" "Static CSS Files" 200
test_endpoint "$BASE_URL/_next/static/chunks" "JS Bundles" 200

echo "3. Testing API Endpoints"
echo "========================"
echo ""

# Test form submission
test_form_submission

# Test database connectivity
test_database_connectivity

echo "4. Testing Mobile Responsiveness Headers"
echo "======================================="
echo ""

# Check for responsive meta tags
check_content "$BASE_URL" "Viewport Meta Tag" "viewport"
check_content "$BASE_URL" "Mobile Optimized" "width=device-width"

echo "5. Performance Checks"
echo "====================="
echo ""

# Test with compression
if curl -s -I "$BASE_URL" | grep -qi "content-encoding: gzip\|content-encoding: br"; then
    echo "✅ Compression enabled (gzip/Brotli)"
    echo "✅ Performance: Compression enabled" >> $REPORT_FILE
else
    echo "⚠️  Compression not detected"
    echo "⚠️  Performance: No compression detected" >> $REPORT_FILE
fi
echo ""

# Check for caching headers
if curl -s -I "$BASE_URL" | grep -qi "cache-control"; then
    echo "✅ Cache headers present"
    echo "✅ Performance: Cache headers present" >> $REPORT_FILE
else
    echo "⚠️  No cache headers detected"
    echo "⚠️  Performance: No cache headers" >> $REPORT_FILE
fi
echo ""

echo "6. Security Checks"
echo "=================="
echo ""

# Check for security headers
if curl -s -I "$BASE_URL" | grep -qi "x-frame-options\|content-security-policy"; then
    echo "✅ Security headers present"
    echo "✅ Security: Headers configured" >> $REPORT_FILE
else
    echo "⚠️  Consider adding security headers"
    echo "⚠️  Security: Headers missing" >> $REPORT_FILE
fi
echo ""

echo "=========================================="
echo "📊 Summary Report"
echo "=========================================="
echo ""

# Count passes and fails
passes=$(grep -c "✅" $REPORT_FILE)
fails=$(grep -c "❌" $REPORT_FILE)
warnings=$(grep -c "⚠️" $REPORT_FILE)

echo "Total Tests Passed: $passes"
echo "Total Tests Failed: $fails"
echo "Total Warnings: $warnings"
echo ""
echo "Full report saved to: $REPORT_FILE"

echo ""
echo "=========================================="
echo "🔧 Next Steps"
echo "=========================================="
echo ""
echo "1. For comprehensive browser automation testing:"
echo "   npm install --save-dev @playwright/test"
echo "   npx playwright install"
echo ""
echo "2. Create Playwright tests for:"
echo "   - Interactive element functionality"
echo "   - Mobile responsiveness"
echo "   - Animation performance"
echo "   - Form validation"
echo ""
echo "3. For manual testing recommendations:"
echo "   - Test on multiple browsers (Chrome, Firefox, Safari)"
echo "   - Test on mobile devices"
echo "   - Verify animations and transitions"
echo "   - Test form submission with real data"
echo ""

# Exit with error code if any tests failed
if [ "$fails" -gt 0 ]; then
    exit 1
else
    exit 0
fi