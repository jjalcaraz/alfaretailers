import { test, expect } from '@playwright/test';

test.describe('SEO Validation Tests', () => {
  const baseUrl = 'http://localhost:3000';
  const expectedPages = [
    '/',
    '/how-it-works',
    '/apply',
    '/about',
    '/faq',
    '/contact',
    '/privacy'
  ];

  test.describe('Sitemap Validation', () => {
    test('sitemap.xml should be accessible and valid', async ({ request }) => {
      const response = await request.get(`${baseUrl}/sitemap.xml`);

      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toContain('application/xml');

      const sitemapText = await response.text();
      expect(sitemapText).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(sitemapText).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

      // Check that all expected pages are in the sitemap
      expectedPages.forEach(page => {
        expect(sitemapText).toContain(`https://www.alfaretailers.com${page}`);
      });

      // Validate XML structure
      expect(sitemapText).toContain('<loc>');
      expect(sitemapText).toContain('<lastmod>');
      expect(sitemapText).toContain('<changefreq>');
      expect(sitemapText).toContain('<priority>');

      // Check priority values are within valid range (0.0 to 1.0)
      const priorities = sitemapText.match(/<priority>([0-9.]+)<\/priority>/g);
      priorities?.forEach(priority => {
        const value = parseFloat(priority.replace(/<[^>]*>/g, ''));
        expect(value).toBeGreaterThanOrEqual(0.0);
        expect(value).toBeLessThanOrEqual(1.0);
      });
    });
  });

  test.describe('Robots.txt Validation', () => {
    test('robots.txt should be accessible and properly configured', async ({ request }) => {
      const response = await request.get(`${baseUrl}/robots.txt`);

      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toContain('text/plain');

      const robotsText = await response.text();

      // Check for essential directives
      expect(robotsText).toContain('User-agent: *');
      expect(robotsText).toContain('Allow: /');
      expect(robotsText).toContain('Sitemap: https://www.alfaretailers.com/sitemap.xml');

      // Check that blocked paths are properly configured
      expect(robotsText).toContain('Disallow: /api/');
      expect(robotsText).toContain('Disallow: /_next/');
      expect(robotsText).toContain('Disallow: /admin/');
    });
  });

  test.describe('Manifest.json Validation', () => {
    test('manifest.json should be accessible and valid', async ({ request }) => {
      const response = await request.get(`${baseUrl}/manifest.json`);

      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toContain('application/json');

      const manifest = await response.json();

      // Validate required fields
      expect(manifest).toHaveProperty('name');
      expect(manifest).toHaveProperty('short_name');
      expect(manifest).toHaveProperty('start_url');
      expect(manifest).toHaveProperty('display');
      expect(manifest).toHaveProperty('background_color');
      expect(manifest).toHaveProperty('theme_color');

      // Check values
      expect(manifest.name).toBe('Alfa Retailers - Property Management Services');
      expect(manifest.short_name).toBe('Alfa Retailers');
      expect(manifest.start_url).toBe('/');
      expect(manifest.display).toBe('standalone');
      expect(manifest.theme_color).toBe('#2563eb');

      // Check for icons
      expect(manifest).toHaveProperty('icons');
      expect(Array.isArray(manifest.icons)).toBe(true);
    });
  });

  test.describe('Meta Tags Validation', () => {
    expectedPages.forEach(page => {
      test(`${page} should have proper meta tags`, async ({ page: playwrightPage }) => {
        await playwrightPage.goto(`${baseUrl}${page}`);

        // Check for title
        const title = await playwrightPage.title();
        expect(title).toBeTruthy();
        expect(title.length).toBeGreaterThan(0);
        expect(title).toContain('Alfa Retailers');

        // Check for meta description
        const metaDescription = await playwrightPage.getAttribute('meta[name="description"]', 'content');
        expect(metaDescription).toBeTruthy();
        expect(metaDescription!.length).toBeGreaterThan(50);
        expect(metaDescription!.length).toBeLessThan(160);

        // Check for viewport meta tag
        const viewport = await playwrightPage.getAttribute('meta[name="viewport"]', 'content');
        expect(viewport).toContain('width=device-width');

        // Check for canonical URL
        const canonical = await playwrightPage.getAttribute('link[rel="canonical"]', 'href');
        expect(canonical).toBeTruthy();
        expect(canonical).toBe('https://www.alfaretailers.com' + (page === '/' ? '' : page));

        // Check for Open Graph tags
        const ogTitle = await playwrightPage.getAttribute('meta[property="og:title"]', 'content');
        const ogDescription = await playwrightPage.getAttribute('meta[property="og:description"]', 'content');
        const ogImage = await playwrightPage.getAttribute('meta[property="og:image"]', 'content');
        const ogType = await playwrightPage.getAttribute('meta[property="og:type"]', 'content');

        expect(ogTitle).toBeTruthy();
        expect(ogDescription).toBeTruthy();
        expect(ogType).toBe('website');

        // Check for Twitter Card tags
        const twitterCard = await playwrightPage.getAttribute('meta[name="twitter:card"]', 'content');
        expect(twitterCard).toBe('summary_large_image');
      });
    });
  });

  test.describe('Structured Data Validation', () => {
    test('homepage should contain structured data', async ({ page }) => {
      await page.goto(`${baseUrl}/`);

      // Look for structured data scripts
      const structuredDataScripts = await page.locator('script[type="application/ld+json"]').count();
      expect(structuredDataScripts).toBeGreaterThan(0);

      // Validate first structured data script
      const firstScript = await page.locator('script[type="application/ld+json"]').first().textContent();
      expect(firstScript).toBeTruthy();

      try {
        const structuredData = JSON.parse(firstScript!);

        // Check for Organization schema
        if (structuredData['@type'] === 'Organization' || Array.isArray(structuredData)) {
          const orgData = Array.isArray(structuredData)
            ? structuredData.find(item => item['@type'] === 'Organization')
            : structuredData;

          if (orgData) {
            expect(orgData.name).toBe('Alfa Retailers');
            expect(orgData.url).toBe('https://alfaretailers.com');
          }
        }
      } catch (e) {
        // If JSON parsing fails, that's an issue with the structured data
        expect.fail('Structured data is not valid JSON');
      }
    });
  });

  test.describe('Header Tags Validation', () => {
    test('pages should have proper heading structure', async ({ page }) => {
      await page.goto(`${baseUrl}/`);

      // Check for H1 tag
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1); // Should have exactly one H1

      const h1Text = await page.locator('h1').textContent();
      expect(h1Text).toBeTruthy();
      expect(h1Text!.length).toBeGreaterThan(0);

      // Check for H2 tags
      const h2Count = await page.locator('h2').count();
      expect(h2Count).toBeGreaterThan(0); // Should have at least one H2
    });
  });

  test.describe('Image SEO Validation', () => {
    test('images should have alt text', async ({ page }) => {
      await page.goto(`${baseUrl}/`);

      const images = page.locator('img');
      const imageCount = await images.count();

      for (let i = 0; i < imageCount; i++) {
        const alt = await images.nth(i).getAttribute('alt');
        const src = await images.nth(i).getAttribute('src');

        // Decorative images can have empty alt, but important images should have alt text
        if (src && !src.includes('icon') && !src.includes('logo')) {
          expect(alt).toBeTruthy();
        }
      }
    });
  });

  test.describe('Mobile Responsiveness', () => {
    test('site should be mobile-friendly', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
      await page.goto(`${baseUrl}/`);

      // Check for viewport meta tag
      const viewport = await page.getAttribute('meta[name="viewport"]', 'content');
      expect(viewport).toContain('width=device-width');

      // Check that content is readable on mobile
      const bodyText = await page.locator('body').textContent();
      expect(bodyText!.length).toBeGreaterThan(100);
    });
  });

  test.describe('Performance Basics', () => {
    test('should load within reasonable time', async ({ page }) => {
      const startTime = Date.now();
      await page.goto(`${baseUrl}/`);
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;

      // Should load within 5 seconds (adjust as needed)
      expect(loadTime).toBeLessThan(5000);
    });
  });
});