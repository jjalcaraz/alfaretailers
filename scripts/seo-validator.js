#!/usr/bin/env node

const https = require('https');
const http = require('http');

class SEOValidator {
  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
    this.errors = [];
    this.warnings = [];
    this.passes = [];
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = type === 'error' ? '❌' : type === 'warning' ? '⚠️' : type === 'success' ? '✅' : 'ℹ️';
    console.log(`${prefix} [${timestamp}] ${message}`);

    if (type === 'error') this.errors.push(message);
    else if (type === 'warning') this.warnings.push(message);
    else if (type === 'success') this.passes.push(message);
  }

  async fetchUrl(url) {
    return new Promise((resolve, reject) => {
      const client = url.startsWith('https') ? https : http;

      const req = client.get(url, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: data
          });
        });
      });

      req.on('error', reject);
      req.setTimeout(10000, () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });
    });
  }

  async validateSitemap() {
    this.log('🔍 Validating sitemap.xml...');

    try {
      const response = await this.fetchUrl(`${this.baseUrl}/sitemap.xml`);

      if (response.status !== 200) {
        this.log(`Sitemap returned status ${response.status}`, 'error');
        return false;
      }

      if (!response.headers['content-type']?.includes('xml')) {
        this.log('Sitemap does not have correct content-type', 'warning');
      }

      const expectedPages = [
        'https://www.alfaretailers.com',
        '/how-it-works',
        '/apply',
        '/about',
        '/faq',
        '/contact',
        '/privacy'
      ];

      let allPagesFound = true;
      expectedPages.forEach(page => {
        if (!response.body.includes(page)) {
          this.log(`Page ${page} not found in sitemap`, 'error');
          allPagesFound = false;
        }
      });

      // Validate XML structure
      if (!response.body.includes('<?xml version="1.0" encoding="UTF-8"?>')) {
        this.log('Sitemap missing XML declaration', 'error');
        allPagesFound = false;
      }

      if (!response.body.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')) {
        this.log('Sitemap missing proper namespace', 'error');
        allPagesFound = false;
      }

      if (allPagesFound) {
        this.log('Sitemap.xml is valid and contains all expected pages', 'success');
      }

      return allPagesFound;
    } catch (error) {
      this.log(`Failed to fetch sitemap: ${error.message}`, 'error');
      return false;
    }
  }

  async validateRobots() {
    this.log('🤖 Validating robots.txt...');

    try {
      const response = await this.fetchUrl(`${this.baseUrl}/robots.txt`);

      if (response.status !== 200) {
        this.log(`Robots.txt returned status ${response.status}`, 'error');
        return false;
      }

      const requiredContent = [
        'User-agent: *',
        'Allow: /',
        'Sitemap: https://www.alfaretailers.com/sitemap.xml',
        'Disallow: /api/',
        'Disallow: /_next/'
      ];

      let allRequiredFound = true;
      requiredContent.forEach(content => {
        if (!response.body.includes(content)) {
          this.log(`Robots.txt missing: ${content}`, 'error');
          allRequiredFound = false;
        }
      });

      if (allRequiredFound) {
        this.log('Robots.txt is properly configured', 'success');
      }

      return allRequiredFound;
    } catch (error) {
      this.log(`Failed to fetch robots.txt: ${error.message}`, 'error');
      return false;
    }
  }

  async validateManifest() {
    this.log('📱 Validating manifest.json...');

    try {
      const response = await this.fetchUrl(`${this.baseUrl}/manifest.json`);

      if (response.status !== 200) {
        this.log(`Manifest returned status ${response.status}`, 'error');
        return false;
      }

      let manifest;
      try {
        manifest = JSON.parse(response.body);
      } catch (parseError) {
        this.log('Manifest.json is not valid JSON', 'error');
        return false;
      }

      const requiredFields = [
        'name',
        'short_name',
        'start_url',
        'display',
        'theme_color'
      ];

      let allFieldsValid = true;
      requiredFields.forEach(field => {
        if (!manifest[field]) {
          this.log(`Manifest missing required field: ${field}`, 'error');
          allFieldsValid = false;
        }
      });

      // Check specific values
      if (manifest.name !== 'Alfa Retailers - Property Management Services') {
        this.log(`Manifest name is incorrect: ${manifest.name}`, 'warning');
      }

      if (manifest.theme_color !== '#2563eb') {
        this.log(`Manifest theme_color is incorrect: ${manifest.theme_color}`, 'warning');
      }

      if (!Array.isArray(manifest.icons) || manifest.icons.length === 0) {
        this.log('Manifest should have icons array', 'warning');
      }

      if (allFieldsValid) {
        this.log('Manifest.json is valid and properly configured', 'success');
      }

      return allFieldsValid;
    } catch (error) {
      this.log(`Failed to fetch manifest: ${error.message}`, 'error');
      return false;
    }
  }

  async validatePageSEO(page = '/') {
    this.log(`📄 Validating SEO for page: ${page || '/'}`);

    try {
      const response = await this.fetchUrl(`${this.baseUrl}${page}`);

      if (response.status !== 200) {
        this.log(`Page ${page} returned status ${response.status}`, 'error');
        return false;
      }

      let pageValid = true;

      // Check for title tag
      if (!response.body.includes('<title>')) {
        this.log(`Page ${page} missing title tag`, 'error');
        pageValid = false;
      } else {
        const titleMatch = response.body.match(/<title>([^<]+)<\/title>/);
        if (titleMatch) {
          const title = titleMatch[1];
          if (title.length < 10 || title.length > 60) {
            this.log(`Page ${page} title length (${title.length}) is not optimal (10-60 chars)`, 'warning');
          }
          if (!title.includes('Alfa Retailers')) {
            this.log(`Page ${page} title should include 'Alfa Retailers'`, 'warning');
          }
        }
      }

      // Check for meta description
      if (!response.body.includes('name="description"')) {
        this.log(`Page ${page} missing meta description`, 'error');
        pageValid = false;
      } else {
        const descMatch = response.body.match(/name="description" content="([^"]+)"/);
        if (descMatch) {
          const description = descMatch[1];
          if (description.length < 50 || description.length > 160) {
            this.log(`Page ${page} description length (${description.length}) is not optimal (50-160 chars)`, 'warning');
          }
        }
      }

      // Check for viewport meta tag
      if (!response.body.includes('name="viewport"')) {
        this.log(`Page ${page} missing viewport meta tag`, 'error');
        pageValid = false;
      }

      // Check for canonical URL
      if (!response.body.includes('rel="canonical"')) {
        this.log(`Page ${page} missing canonical URL`, 'warning');
      }

      // Check for Open Graph tags
      const ogTags = ['og:title', 'og:description', 'og:type', 'og:image'];
      let missingOGTags = [];
      ogTags.forEach(tag => {
        if (!response.body.includes(`property="${tag}"`) && !response.body.includes(`property="${og}"`)) {
          missingOGTags.push(tag);
        }
      });

      if (missingOGTags.length > 0) {
        this.log(`Page ${page} missing Open Graph tags: ${missingOGTags.join(', ')}`, 'warning');
      }

      // Check for structured data
      if (!response.body.includes('application/ld+json')) {
        this.log(`Page ${page} missing structured data`, 'warning');
      }

      // Check for H1 tags (should have exactly one)
      const h1Matches = response.body.match(/<h1[^>]*>/g);
      if (!h1Matches || h1Matches.length === 0) {
        this.log(`Page ${page} missing H1 tag`, 'error');
        pageValid = false;
      } else if (h1Matches.length > 1) {
        this.log(`Page ${page} has multiple H1 tags (${h1Matches.length})`, 'warning');
      }

      if (pageValid) {
        this.log(`Page ${page} SEO validation passed`, 'success');
      }

      return pageValid;
    } catch (error) {
      this.log(`Failed to validate page ${page}: ${error.message}`, 'error');
      return false;
    }
  }

  async runAllValidations() {
    console.log('🚀 Starting SEO Validation for AlfaRetailers\n');

    const startTime = Date.now();

    // Test individual components
    const sitemapValid = await this.validateSitemap();
    const robotsValid = await this.validateRobots();
    const manifestValid = await this.validateManifest();

    // Test main pages
    const pages = ['/', '/how-it-works', '/apply', '/about', '/faq', '/contact', '/privacy'];
    let pageResults = [];

    for (const page of pages) {
      const pageValid = await this.validatePageSEO(page);
      pageResults.push({ page, valid: pageValid });
    }

    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 SEO VALIDATION SUMMARY');
    console.log('='.repeat(60));

    console.log(`\n⏱️  Validation completed in ${duration} seconds\n`);

    console.log('📋 Results:');
    console.log(`   Sitemap.xml: ${sitemapValid ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`   Robots.txt: ${robotsValid ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`   Manifest.json: ${manifestValid ? '✅ PASS' : '❌ FAIL'}`);

    console.log('\n📄 Page SEO Results:');
    pageResults.forEach(({ page, valid }) => {
      console.log(`   ${page || '/'}: ${valid ? '✅ PASS' : '❌ FAIL'}`);
    });

    console.log(`\n📈 Statistics:`);
    console.log(`   ✅ Passed: ${this.passes.length}`);
    console.log(`   ⚠️  Warnings: ${this.warnings.length}`);
    console.log(`   ❌ Errors: ${this.errors.length}`);

    if (this.errors.length > 0) {
      console.log('\n❌ Critical Issues (Must Fix):');
      this.errors.forEach(error => console.log(`   • ${error}`));
    }

    if (this.warnings.length > 0) {
      console.log('\n⚠️  Warnings (Recommended Fix):');
      this.warnings.forEach(warning => console.log(`   • ${warning}`));
    }

    const allPassed = sitemapValid && robotsValid && manifestValid &&
                    pageResults.every(result => result.valid) &&
                    this.errors.length === 0;

    console.log('\n' + '='.repeat(60));
    if (allPassed) {
      console.log('🎉 ALL TESTS PASSED! Your SEO is ready for production.');
    } else {
      console.log('⚠️  Some tests failed. Please review and fix the issues above.');
    }
    console.log('='.repeat(60));

    return allPassed;
  }
}

// Run the validation if this script is executed directly
if (require.main === module) {
  const validator = new SEOValidator();
  validator.runAllValidations().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(error => {
    console.error('Validation failed:', error);
    process.exit(1);
  });
}

module.exports = SEOValidator;