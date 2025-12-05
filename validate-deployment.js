#!/usr/bin/env node

const https = require('https');
const { exec } = require('child_process');
const fs = require('fs');

const BASE_URL = 'https://alfaretailers.vercel.app';
const results = {
  passed: [],
  failed: [],
  warnings: []
};

// Helper function to make HTTP request
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        resolve({
          statusCode: response.statusCode,
          headers: response.headers,
          data: data
        });
      });
    });

    request.on('error', (error) => {
      reject(error);
    });

    request.setTimeout(5000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// Helper function to log results
function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = {
    'pass': '✅',
    'fail': '❌',
    'warn': '⚠️',
    'info': 'ℹ️'
  }[type];

  console.log(`${prefix} [${timestamp}] ${message}`);
}

// Test functions
async function testPageLoad(path, name) {
  try {
    const response = await makeRequest(`${BASE_URL}${path}`);

    if (response.statusCode === 200) {
      results.passed.push(`${name}: Page loads successfully`);
      log(`${name}: Page loads successfully (HTTP 200)`, 'pass');

      // Check for errors in HTML
      if (response.data.includes('Error') || response.data.includes('error')) {
        results.warnings.push(`${name}: Error text detected in page`);
        log(`${name}: Warning - Error text detected in page`, 'warn');
      }

      // Check for key content
      if (path === '/' || path === '') {
        if (response.data.includes('ALFA RETAILERS') || response.data.includes('Alfa Retailers')) {
          results.passed.push(`${name}: Brand name found`);
        } else {
          results.warnings.push(`${name}: Brand name not found in text`);
        }

        if (response.data.includes('logo-alfa.png')) {
          results.passed.push(`${name}: Logo image reference found`);
        } else {
          results.warnings.push(`${name}: Logo image not found`);
        }
      }

    } else {
      results.failed.push(`${name}: HTTP ${response.statusCode}`);
      log(`${name}: Failed with HTTP ${response.statusCode}`, 'fail');
    }
  } catch (error) {
    results.failed.push(`${name}: ${error.message}`);
    log(`${name}: ${error.message}`, 'fail');
  }
}

async function testAPIEndpoint(path, name, method = 'GET') {
  try {
    const response = await makeRequest(`${BASE_URL}${path}`);

    if (response.statusCode === 200 || response.statusCode === 405) { // 405 for POST endpoints
      results.passed.push(`${name}: API endpoint accessible`);
      log(`${name}: API endpoint accessible (HTTP ${response.statusCode})`, 'pass');
    } else {
      results.failed.push(`${name}: HTTP ${response.statusCode}`);
      log(`${name}: Failed with HTTP ${response.statusCode}`, 'fail');
    }
  } catch (error) {
    results.failed.push(`${name}: ${error.message}`);
    log(`${name}: ${error.message}`, 'fail');
  }
}

async function testStaticAssets() {
  const assets = [
    '/_next/static/css/',
    '/_next/static/chunks/'
  ];

  for (const asset of assets) {
    try {
      const response = await makeRequest(`${BASE_URL}${asset}`);
      if (response.statusCode === 200) {
        results.passed.push(`Static assets accessible: ${asset}`);
        log(`Static assets accessible: ${asset}`, 'pass');
      } else {
        results.warnings.push(`Static assets returned ${response.statusCode}: ${asset}`);
      }
    } catch (error) {
      results.warnings.push(`Static assets error: ${asset} - ${error.message}`);
    }
  }
}

// Main validation function
async function runValidation() {
  log('Starting AlfaRetailers deployment validation...', 'info');
  log(`Testing URL: ${BASE_URL}`, 'info');
  console.log('='.repeat(60));

  // Test main pages
  await testPageLoad('/', 'Homepage');
  await testPageLoad('/about', 'About page');
  await testPageLoad('/how-it-works', 'How It Works');
  await testPageLoad('/faq', 'FAQ');
  await testPageLoad('/contact', 'Contact');
  await testPageLoad('/apply', 'Application page');

  console.log('');
  log('Testing API endpoints...', 'info');

  // Test API endpoints
  await testAPIEndpoint('/api/applications', 'Applications API');

  console.log('');
  log('Testing static assets...', 'info');

  // Test static assets
  await testStaticAssets();

  // Summary
  console.log('');
  console.log('='.repeat(60));
  log('VALIDATION SUMMARY', 'info');
  console.log('='.repeat(60));

  console.log(`\n✅ Passed: ${results.passed.length}`);
  results.passed.forEach(r => console.log(`   ${r}`));

  if (results.warnings.length > 0) {
    console.log(`\n⚠️  Warnings: ${results.warnings.length}`);
    results.warnings.forEach(r => console.log(`   ${r}`));
  }

  if (results.failed.length > 0) {
    console.log(`\n❌ Failed: ${results.failed.length}`);
    results.failed.forEach(r => console.log(`   ${r}`));
  }

  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    url: BASE_URL,
    summary: {
      passed: results.passed.length,
      warnings: results.warnings.length,
      failed: results.failed.length
    },
    results
  };

  fs.writeFileSync('deployment-validation-report.json', JSON.stringify(report, null, 2));
  console.log(`\n📄 Full report saved to: deployment-validation-report.json`);

  // Recommendations
  console.log('\n='.repeat(60));
  log('RECOMMENDATIONS', 'info');
  console.log('='.repeat(60));

  if (results.failed.length === 0) {
    console.log('\n✅ Deployment looks good! Here are some suggestions:');
    console.log('   1. Run Playwright tests for comprehensive UI testing');
    console.log('   2. Test form submissions with real data');
    console.log('   3. Verify database connectivity');
    console.log('   4. Test on different browsers and devices');
    console.log('   5. Check animations and transitions');
  } else {
    console.log('\n❌ Issues found that need attention:');
    console.log('   1. Fix failed tests above');
    console.log('   2. Check Vercel deployment logs');
    console.log('   3. Verify environment variables');
    console.log('   4. Test API endpoints locally');
  }

  console.log('\nTo run comprehensive Playwright tests:');
  console.log('   npm install -D @playwright/test');
  console.log('   npx playwright install');
  console.log('   npx playwright test');

  console.log('\n='.repeat(60));
}

// Run validation
runValidation().catch(console.error);