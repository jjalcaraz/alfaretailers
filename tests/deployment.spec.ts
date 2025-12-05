import { test, expect } from '@playwright/test';

test.describe('AlfaRetailers Deployment Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Capture console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('CONSOLE ERROR:', msg.text());
      }
    });

    // Capture uncaught errors
    page.on('pageerror', err => {
      console.error('PAGE ERROR:', err);
    });
  });

  test('Homepage loads correctly', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page).toHaveTitle(/Alfa Retailers/);

    // Check for main heading
    await expect(page.locator('h1')).toContainText('Stop Losing Money on Empty Properties');

    // Check for CTA buttons
    await expect(page.locator('a[href="/apply"]')).toBeVisible();
    await expect(page.locator('a[href="/how-it-works"]')).toBeVisible();
    await expect(page.locator('a[href="/contact"]')).toBeVisible();

    // Check for logo
    await expect(page.locator('img[alt="Alfa Retailers"]')).toBeVisible();

    // Check for statistics
    await expect(page.locator('text=Properties Under Management')).toBeVisible();
    await expect(page.locator('text=Additional Owner Revenue')).toBeVisible();
    await expect(page.locator('text=Average Monthly Income Increase')).toBeVisible();
  });

  test('Navigation works correctly', async ({ page }) => {
    await page.goto('/');

    // Test navigation links
    const navLinks = [
      { href: '/how-it-works', text: 'How It Works' },
      { href: '/about', text: 'About' },
      { href: '/faq', text: 'FAQ' },
      { href: '/contact', text: 'Contact' }
    ];

    for (const link of navLinks) {
      await page.click(`a[href="${link.href}"]`);
      await expect(page).toHaveURL(link.href);
      await expect(page.locator('h1, h2')).toBeVisible({ timeout: 5000 });
    }
  });

  test('About page loads', async ({ page }) => {
    await page.goto('/about');

    await expect(page.locator('h1, h2')).toBeVisible();
    // Check for about page content
    await expect(page.locator('text=About')).toBeVisible();
  });

  test('How It Works page loads', async ({ page }) => {
    await page.goto('/how-it-works');

    await expect(page.locator('h1, h2')).toContainText('From Empty Property to Profit Machine');

    // Check for process steps
    await expect(page.locator('text=Free Analysis')).toBeVisible();
    await expect(page.locator('text=Custom Strategy')).toBeVisible();
    await expect(page.locator('text=Launch & Earn')).toBeVisible();
  });

  test('FAQ page loads', async ({ page }) => {
    await page.goto('/faq');

    await expect(page.locator('h1, h2')).toContainText('FAQ');

    // Check for FAQ items
    await expect(page.locator('text=How much more income can I make')).toBeVisible();
    await expect(page.locator('text=How long does it take to start earning')).toBeVisible();
  });

  test('Contact page loads', async ({ page }) => {
    await page.goto('/contact');

    await expect(page.locator('h1, h2')).toContainText('Contact');

    // Check for contact form
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[name="firstName"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('Application page loads', async ({ page }) => {
    await page.goto('/apply');

    await expect(page.locator('h1, h2')).toContainText('Application');

    // Check for form fields
    await expect(page.locator('input[name="firstName"]')).toBeVisible();
    await expect(page.locator('input[name="lastName"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="phone"]')).toBeVisible();
  });

  test('Mobile responsiveness', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone viewport
    await page.goto('/');

    // Check mobile menu is present
    await expect(page.locator('button:has(svg.lucide-menu)')).toBeVisible();

    // Check content is still visible
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('img[alt="Alfa Retailers"]')).toBeVisible();

    // Check CTA buttons are visible on mobile
    await expect(page.locator('a[href="/apply"]')).toBeVisible();
  });

  test('Form submission validation', async ({ page }) => {
    await page.goto('/apply');

    // Try to submit empty form
    await page.click('button[type="submit"]');

    // Check for validation errors
    await expect(page.locator('text=Required')).toBeVisible({ timeout: 3000 });
  });

  test('Animations and transitions', async ({ page }) => {
    await page.goto('/');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check if Framer Motion styles are loaded
    const styles = await page.locator('style').all();
    let hasMotionStyles = false;

    for (const style of styles) {
      const content = await style.textContent();
      if (content && content.includes('framer')) {
        hasMotionStyles = true;
        break;
      }
    }

    // Check for animation-related elements
    const animatedElements = await page.locator('[style*="opacity"], [style*="transform"]').count();
    expect(animatedElements).toBeGreaterThan(0);
  });

  test('Meta tags and SEO', async ({ page }) => {
    await page.goto('/');

    // Check for critical meta tags
    await expect(page.locator('meta[name="description"]')).toBeVisible();
    await expect(page.locator('meta[property="og:title"]')).toBeVisible();
    await expect(page.locator('meta[property="og:description"]')).toBeVisible();
    await expect(page.locator('meta[name="viewport"]')).toHaveAttribute('content', 'width=device-width, initial-scale=1');

    // Check for structured data
    const structuredData = await page.locator('script[type="application/ld+json"]').count();
    expect(structuredData).toBeGreaterThan(0);
  });

  test('Performance metrics', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;

    // Page should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);

    // Check for critical resources
    const cssLoaded = await page.locator('link[rel="stylesheet"]').count();
    const jsLoaded = await page.locator('script[src]').count();

    expect(cssLoaded).toBeGreaterThan(0);
    expect(jsLoaded).toBeGreaterThan(0);
  });

  test('Error handling - 404 page', async ({ page }) => {
    const response = await page.goto('/non-existent-page');
    expect(response?.status()).toBe(404);

    // Check if custom 404 page is shown
    await expect(page.locator('text=404')).toBeVisible({ timeout: 5000 });
  });
});