import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const FE_URL = process.env.FE_URL || 'http://127.0.0.1:8080/prediction';
const OUT_PATH =
  process.env.OUT_PATH ||
  path.resolve(
    'd:/HK6/Py/HouseSellWeb-main/tasks-manager/task/plan-006/evidence/c05-c07-smoke-report.json',
  );

const expectedKeys = [
  'province_name',
  'district_name',
  'ward_name',
  'property_type_name',
  'area',
  'floor_count',
  'bedroom_count',
  'bathroom_count',
];

function hasExpectedPayloadShape(payload) {
  if (!payload || typeof payload !== 'object') return false;
  const keys = Object.keys(payload).sort();
  const expected = [...expectedKeys].sort();
  if (JSON.stringify(keys) !== JSON.stringify(expected)) return false;
  return (
    typeof payload.province_name === 'string' &&
    typeof payload.district_name === 'string' &&
    typeof payload.ward_name === 'string' &&
    typeof payload.property_type_name === 'string' &&
    typeof payload.area === 'number' &&
    typeof payload.floor_count === 'number' &&
    typeof payload.bedroom_count === 'number' &&
    typeof payload.bathroom_count === 'number'
  );
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const results = {};

  try {
    // C05: Missing required fields -> no API call + show form error
    {
      const context = await browser.newContext();
      const page = await context.newPage();
      let predictionRequestCount = 0;

      page.on('request', (request) => {
        if (request.url().includes('/api/prediction/')) predictionRequestCount += 1;
      });

      await page.goto(FE_URL, { waitUntil: 'domcontentloaded' });
      await page.getByRole('button', { name: 'Dự đoán giá nhà' }).click();
      await page.waitForTimeout(250);

      const errorVisible = await page
        .locator('text=Vui lòng nhập đầy đủ thông tin bất động sản bắt buộc.')
        .isVisible();

      results.C05 = {
        pass: predictionRequestCount === 0 && errorVisible,
        predictionRequestCount,
        errorVisible,
      };

      await context.close();
    }

    // C06: FE -> BE payload sync + render API result card
    {
      const context = await browser.newContext();
      const page = await context.newPage();
      let capturedPayload = null;

      await page.route('**/api/prediction/', async (route) => {
        const request = route.request();
        if (request.method() === 'POST') {
          capturedPayload = request.postDataJSON();
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
              estimated_price: 4500000000,
              price_min: 3960000000,
              price_max: 5040000000,
              confidence: 0.86,
              price_per_m2: 56250000,
            }),
          });
          return;
        }
        await route.continue();
      });

      await page.goto(FE_URL, { waitUntil: 'domcontentloaded' });
      await page.selectOption('#propertyTypeName', { value: 'Nhà' });
      await page.fill('#area', '80');
      await page.fill('#floorCount', '4');
      await page.fill('#bedroomCount', '3');
      await page.fill('#bathroomCount', '3');

      await page.getByRole('button', { name: 'Dự đoán giá nhà' }).click();
      await page.waitForSelector('h3:has-text("Kết quả dự đoán")', { timeout: 5000 });

      const resultVisible = await page.getByRole('heading', { name: 'Kết quả dự đoán' }).isVisible();
      const payloadShapeOk = hasExpectedPayloadShape(capturedPayload);

      results.C06 = {
        pass: payloadShapeOk && resultVisible,
        payloadShapeOk,
        resultVisible,
        capturedPayload,
      };

      await context.close();
    }

    // C07: API network fail -> page not crash + fallback result shown
    {
      const context = await browser.newContext();
      const page = await context.newPage();

      await page.route('**/api/prediction/', async (route) => {
        await route.abort('failed');
      });

      await page.goto(FE_URL, { waitUntil: 'domcontentloaded' });
      await page.selectOption('#propertyTypeName', { value: 'Nhà' });
      await page.fill('#area', '80');
      await page.fill('#floorCount', '4');
      await page.fill('#bedroomCount', '3');
      await page.fill('#bathroomCount', '3');
      await page.getByRole('button', { name: 'Dự đoán giá nhà' }).click();

      await page.waitForSelector('h3:has-text("Kết quả dự đoán")', { timeout: 5000 });

      const resultVisible = await page.getByRole('heading', { name: 'Kết quả dự đoán' }).isVisible();
      const hasFallbackMin = await page.locator('text=4.40 tỷ').isVisible();
      const hasFallbackMax = await page.locator('text=5.60 tỷ').isVisible();

      results.C07 = {
        pass: resultVisible && hasFallbackMin && hasFallbackMax,
        resultVisible,
        hasFallbackMin,
        hasFallbackMax,
      };

      await context.close();
    }
  } finally {
    await browser.close();
  }

  fs.writeFileSync(OUT_PATH, JSON.stringify(results, null, 2), 'utf8');
  console.log(JSON.stringify(results, null, 2));
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
