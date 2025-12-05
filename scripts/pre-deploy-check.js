#!/usr/bin/env node

const SEOValidator = require('./seo-validator');

console.log('🚀 PRE-DEPLOYMENT VALIDATION FOR ALFA RETAILERS');
console.log('This script validates that your site is ready for production deployment.\n');

async function runPreDeployValidation() {
  const validator = new SEOValidator();

  // Check if dev server is running
  try {
    const http = require('http');
    await new Promise((resolve, reject) => {
      const req = http.get('http://localhost:3000', (res) => {
        if (res.statusCode === 200) {
          resolve();
        } else {
          reject(new Error(`Dev server returned status ${res.statusCode}`));
        }
      });
      req.on('error', reject);
      req.setTimeout(5000, () => {
        req.destroy();
        reject(new Error('Dev server not responding'));
      });
    });
  } catch (error) {
    console.error('❌ Dev server is not running on http://localhost:3000');
    console.error('Please start the dev server with "npm run dev" before running this script.');
    process.exit(1);
  }

  console.log('✅ Dev server is running\n');

  // Run SEO validation
  const seoResults = await validator.runAllValidations();

  // Additional production checks
  console.log('\n🔍 PRODUCTION READINESS CHECKS\n');

  let productionReady = true;

  // Check for environment variables
  const requiredEnvVars = [
    'NEXT_PUBLIC_VERCEL_URL',
    'DATABASE_URL'
  ];

  console.log('🔧 Environment Variables:');
  requiredEnvVars.forEach(envVar => {
    if (process.env[envVar]) {
      console.log(`   ✅ ${envVar} is set`);
    } else {
      console.log(`   ⚠️  ${envVar} is not set (will use defaults)`);
    }
  });

  // Check build process
  console.log('\n🏗️  Build Validation:');
  try {
    const { execSync } = require('child_process');
    console.log('   🔨 Testing build process...');
    execSync('npm run build', { stdio: 'pipe', timeout: 60000 });
    console.log('   ✅ Build successful');
  } catch (error) {
    console.log('   ❌ Build failed');
    console.error('   Error:', error.message);
    productionReady = false;
  }

  // Final verdict
  console.log('\n' + '='.repeat(60));
  console.log('🎯 PRODUCTION READINESS VERDICT');
  console.log('='.repeat(60));

  const allTestsPassed = seoResults && productionReady;

  if (allTestsPassed) {
    console.log('🎉 YOUR SITE IS READY FOR PRODUCTION DEPLOYMENT!');
    console.log('\n✅ All validations passed:');
    console.log('   • SEO configuration is optimal');
    console.log('   • Build process successful');
    console.log('   • All critical endpoints accessible');
    console.log('\n🚀 You can now deploy with confidence!');
  } else {
    console.log('⚠️  YOUR SITE NEEDS ATTENTION BEFORE DEPLOYMENT');
    console.log('\n❌ Issues found that must be resolved:');
    console.log('   • Review the errors and warnings above');
    console.log('   • Fix all critical issues before deploying');
    console.log('   • Run this script again to validate fixes');
  }

  console.log('='.repeat(60));

  return allTestsPassed;
}

// Run validation
runPreDeployValidation()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Pre-deploy validation failed:', error.message);
    process.exit(1);
  });