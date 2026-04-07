const { test, expect } = require('playwright/test');

const BASE_URL = process.env.SMOKE_BASE_URL || 'http://127.0.0.1:4173';

async function fillValidPredictionForm(page) {
  await page.selectOption('#propertyTypeName', { label: 'Nhà' });
  await page.fill('#area', '80');
  await page.fill('#floorCount', '4');
  await page.fill('#bedroomCount', '3');
  await page.fill('#bathroomCount', '3');
}

test.describe('Prediction V6 smoke (C05-C07)', () => {
  test('C05: missing required fields -> no API call and show validation message', async ({ page }) => {
    let requestCount = 0;

    await page.route('**/api/prediction/', async (route) => {
      requestCount += 1;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ estimated_price: 1, price_min: 1, price_max: 1, confidence: 0.8, price_per_m2: 1 }),
      });
    });

    await page.goto(`${BASE_URL}/prediction`);

    await page.evaluate(() => {
      const form = document.querySelector('form');
      form?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    });

    await expect(page.getByText('Vui lòng nhập đầy đủ thông tin bất động sản bắt buộc.')).toBeVisible();
    expect(requestCount).toBe(0);
  });

  test('C06: valid FE -> BE payload schema V6 and result render', async ({ page }) => {
    let capturedBody = null;

    await page.route('**/api/prediction/', async (route) => {
      capturedBody = route.request().postDataJSON();
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          estimated_price: 5000000000,
          price_min: 4400000000,
          price_max: 5600000000,
          confidence: 0.82,
          price_per_m2: 62500000,
        }),
      });
    });

    await page.goto(`${BASE_URL}/prediction`);
    await fillValidPredictionForm(page);
    await page.getByRole('button', { name: 'Dự đoán giá nhà' }).click();

    await expect(page.getByRole('heading', { name: 'Kết quả dự đoán' })).toBeVisible();

    expect(capturedBody).toBeTruthy();
    const requiredKeys = [
      'province_name',
      'district_name',
      'ward_name',
      'property_type_name',
      'area',
      'floor_count',
      'bedroom_count',
      'bathroom_count',
    ];
    for (const key of requiredKeys) {
      expect(Object.prototype.hasOwnProperty.call(capturedBody, key)).toBeTruthy();
    }
    expect(capturedBody.property_type_name).toBe('Nhà');
    expect(capturedBody.area).toBe(80);
    expect(capturedBody.floor_count).toBe(4);
    expect(capturedBody.bedroom_count).toBe(3);
    expect(capturedBody.bathroom_count).toBe(3);
  });

  test('C07: API network failure -> fallback result rendered safely', async ({ page }) => {
    await page.route('**/api/prediction/', async (route) => {
      await route.abort('failed');
    });

    await page.goto(`${BASE_URL}/prediction`);
    await fillValidPredictionForm(page);
    await page.getByRole('button', { name: 'Dự đoán giá nhà' }).click();

    await expect(page.getByRole('heading', { name: 'Kết quả dự đoán' })).toBeVisible();
    await expect(page.getByText('5.00 tỷ')).toBeVisible();
  });
});
