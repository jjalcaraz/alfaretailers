#!/usr/bin/env node

/**
 * SEO Redirect Testing Script
 * Tests all redirect scenarios for WWW vs non-WWW configuration
 */

const https = require('https')
const http = require('http')

const domain = 'alfaretailers.com'
const testUrls = [
  // Non-WWW to WWW redirects
  `http://${domain}/`,
  `http://${domain}/about`,
  `http://${domain}/how-it-works`,
  `https://${domain}/`,
  `https://${domain}/about`,
  `https://${domain}/how-it-works`,
  // WWW with trailing slash tests
  `https://www.${domain}/how-it-works/`,
  `https://www.${domain}/about/`,
  // WWW HTTPS (should not redirect)
  `https://www.${domain}/`,
  `https://www.${domain}/about`,
]

function checkRedirect(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    const urlObj = new URL(url)

    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (url.startsWith('https') ? 443 : 80),
      path: urlObj.pathname,
      method: 'HEAD',
      headers: {
        'User-Agent': 'SEO-Redirect-Test/1.0'
      }
    }

    const req = protocol.request(options, (res) => {
      resolve({
        originalUrl: url,
        statusCode: res.statusCode,
        location: res.headers.location,
        finalUrl: res.headers.location ? res.headers.location : url
      })
    })

    req.on('error', (err) => {
      resolve({
        originalUrl: url,
        error: err.message,
        finalUrl: url
      })
    })

    req.setTimeout(10000, () => {
      req.destroy()
      resolve({
        originalUrl: url,
        error: 'Timeout',
        finalUrl: url
      })
    })

    req.end()
  })
}

async function runTests() {
  console.log('🔍 Testing SEO Redirects for Alfa Retailers')
  console.log('=====================================')
  console.log('Preferred Domain: https://www.alfaretailers.com')
  console.log('')

  let allPassed = true
  const results = []

  for (const url of testUrls) {
    console.log(`Testing: ${url}`)
    const result = await checkRedirect(url)
    results.push(result)

    if (result.error) {
      console.log(`  ❌ Error: ${result.error}`)
      allPassed = false
    } else {
      const isCorrectRedirect = result.statusCode === 301 && result.finalUrl.includes('https://www.alfaretailers.com')
      const isCorrectNoRedirect = result.statusCode === 200 && url.includes('https://www.alfaretailers.com')

      if (isCorrectRedirect || isCorrectNoRedirect) {
        console.log(`  ✅ ${result.statusCode} → ${result.finalUrl}`)
      } else {
        console.log(`  ❌ ${result.statusCode} → ${result.finalUrl} (Expected redirect to https://www.alfaretailers.com)`)
        allPassed = false
      }
    }
    console.log('')
  }

  console.log('📊 Test Summary')
  console.log('===============')

  if (allPassed) {
    console.log('✅ All tests passed! SEO redirects are working correctly.')
  } else {
    console.log('❌ Some tests failed. Please review the results above.')
  }

  console.log('')
  console.log('🔧 Recommended Next Steps:')
  console.log('1. Verify SSL certificates are valid for both www and non-www')
  console.log('2. Check Google Search Console for any redirect issues')
  console.log('3. Test with tools like https://httpstatus.io/')
  console.log('4. Monitor for any redirect chains')

  return allPassed
}

// Run the tests
runTests().then(success => {
  process.exit(success ? 0 : 1)
}).catch(err => {
  console.error('Test script error:', err)
  process.exit(1)
})