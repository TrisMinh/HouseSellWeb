import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const APP_URL = process.env.APP_URL || 'http://127.0.0.1:8080';
const API_ORIGIN = process.env.API_ORIGIN || 'http://127.0.0.1:8000';
const OUT_PATH =
  process.env.OUT_PATH ||
  path.resolve(
    'd:/HK6/Py/HouseSellWeb-main/tasks-manager/task/plan-007/evidence/plan007-browser-connectivity-smoke-report.json',
  );

async function run() {
  const browser = await chromium.launch({ headless: true });

  try {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(`${APP_URL}/news`, { waitUntil: 'domcontentloaded' });

    const report = await page.evaluate(async ({ apiOrigin }) => {
      const result = {};
      const jsonHeaders = { 'Content-Type': 'application/json' };

      const callJson = async (url, options = {}) => {
        const response = await fetch(url, options);
        const text = await response.text();
        let data = null;
        try {
          data = text ? JSON.parse(text) : null;
        } catch {
          data = null;
        }
        return { status: response.status, ok: response.ok, data };
      };

      // C01 + C02 register/login
      const suffix = `${Date.now()}_${Math.floor(Math.random() * 100000)}`;
      const username = `v7_browser_${suffix}`;
      const password = 'Pass123!';

      const reg = await callJson(`${apiOrigin}/api/auth/register/`, {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify({
          username,
          email: `${username}@example.com`,
          first_name: 'Browser',
          last_name: 'Smoke',
          password,
          password_confirm: password,
        }),
      });

      const login = await callJson(`${apiOrigin}/api/auth/login/`, {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify({ username, password }),
      });

      const accessToken = login?.data?.access || null;
      result.C01 = { status: reg.status, pass: reg.status === 201 };
      result.C02 = { status: login.status, hasAccessToken: Boolean(accessToken), pass: login.status === 200 && Boolean(accessToken) };

      // C03 properties list
      const propertiesList = await callJson(`${apiOrigin}/api/properties/`);
      const properties = Array.isArray(propertiesList.data)
        ? propertiesList.data
        : (propertiesList.data?.results || []);
      const firstPropertyId = properties[0]?.id;
      result.C03 = {
        status: propertiesList.status,
        count: Array.isArray(properties) ? properties.length : 0,
        pass: propertiesList.status === 200 && Array.isArray(properties) && properties.length > 0,
      };

      // C04 property detail
      let c04 = { status: 0, pass: false };
      if (firstPropertyId) {
        const propertyDetail = await callJson(`${apiOrigin}/api/properties/${firstPropertyId}/`);
        c04 = {
          status: propertyDetail.status,
          pass: propertyDetail.status === 200 && Boolean(propertyDetail.data?.title),
        };
      }
      result.C04 = c04;

      // C05 news list
      const newsList = await callJson(`${apiOrigin}/api/news/`);
      result.C05 = {
        status: newsList.status,
        pass: newsList.status === 200,
      };

      // C06 create appointment
      let c06 = { status: 0, pass: false };
      if (firstPropertyId && accessToken) {
        const appt = await callJson(`${apiOrigin}/api/appointments/`, {
          method: 'POST',
          headers: {
            ...jsonHeaders,
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            property: firstPropertyId,
            date: new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10),
            time: '10:00',
            name: 'Browser Booker',
            phone: '0900000000',
            message: 'V7 browser smoke',
          }),
        });
        c06 = { status: appt.status, pass: appt.status === 201 };
      }
      result.C06 = c06;

      // C07 prediction
      const prediction = await callJson(`${apiOrigin}/api/prediction/`, {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify({
          province_name: 'Ha Noi',
          district_name: 'Cau Giay',
          ward_name: 'Dich Vong',
          property_type_name: 'Nhà',
          area: 80,
          floor_count: 4,
          bedroom_count: 3,
          bathroom_count: 3,
        }),
      });
      result.C07 = {
        status: prediction.status,
        pass: prediction.status === 200 && Number.isFinite(prediction.data?.estimated_price),
      };

      result.summary = {
        allPass: Object.entries(result)
          .filter(([key]) => key.startsWith('C'))
          .every(([, value]) => Boolean(value.pass)),
      };

      return result;
    }, { apiOrigin: API_ORIGIN });

    fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
    fs.writeFileSync(OUT_PATH, JSON.stringify(report, null, 2), 'utf8');
    console.log(JSON.stringify(report, null, 2));

    await context.close();
  } finally {
    await browser.close();
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
