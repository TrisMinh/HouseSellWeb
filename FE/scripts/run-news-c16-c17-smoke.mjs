import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const NEWS_URL = process.env.NEWS_URL || 'http://127.0.0.1:8080/news';
const OUT_PATH =
  process.env.OUT_PATH ||
  path.resolve(
    'd:/HK6/Py/HouseSellWeb-main/tasks-manager/task/plan-005/evidence/news-fe-c16-c17-report.json',
  );

async function run() {
  const browser = await chromium.launch({ headless: true });
  const report = {};

  try {
    // C16: FE renders real API data shape safely (including null thumbnail)
    {
      const context = await browser.newContext();
      const page = await context.newPage();

      await page.route('**/api/news/**', async (route) => {
        const request = route.request();
        if (request.method() === 'GET') {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
              count: 2,
              next: null,
              previous: null,
              results: [
                {
                  id: 9001,
                  title: 'Smoke API Featured News',
                  content: 'Featured content from API for FE smoke C16',
                  thumbnail: null,
                  created_at: '2026-04-07T00:00:00Z',
                  author_name: 'staff_a',
                  views_count: 0,
                  is_published: true,
                },
                {
                  id: 9002,
                  title: 'Smoke API Secondary News',
                  content: 'Secondary content from API for FE smoke C16',
                  thumbnail: null,
                  created_at: '2026-04-07T00:00:00Z',
                  author_name: 'staff_a',
                  views_count: 0,
                  is_published: true,
                },
              ],
            }),
          });
          return;
        }
        await route.continue();
      });

      await page.goto(NEWS_URL, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('text=Smoke API Featured News', { timeout: 7000 });

      const featuredVisible = await page.locator('text=Smoke API Featured News').first().isVisible();
      const secondaryVisible = await page.locator('text=Smoke API Secondary News').first().isVisible();

      report.C16 = {
        pass: featuredVisible && secondaryVisible,
        featuredVisible,
        secondaryVisible,
      };

      await context.close();
    }

    // C17: FE fallback mock when API fails
    {
      const context = await browser.newContext();
      const page = await context.newPage();

      await page.route('**/api/news/**', async (route) => {
        await route.abort('failed');
      });

      await page.goto(NEWS_URL, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector(
        'text=Vietnam Real Estate Market Surges in Early 2026',
        { timeout: 7000 },
      );

      const fallbackVisible = await page
        .locator('text=Vietnam Real Estate Market Surges in Early 2026')
        .first()
        .isVisible();

      report.C17 = {
        pass: fallbackVisible,
        fallbackVisible,
      };

      await context.close();
    }
  } finally {
    await browser.close();
  }

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(report, null, 2), 'utf8');
  console.log(JSON.stringify(report, null, 2));
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
