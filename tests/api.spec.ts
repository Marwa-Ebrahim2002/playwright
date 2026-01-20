import { test, expect, request } from '@playwright/test';

const baseURL = 'https://api.restful-api.dev/objects';
let objectId: string;
let fullpathwithId: string;
// Created ID: ff8081819782e69e019bd67468170224
/* ================= GET ================= */
test('get api', async ({ request }) => {
  const startingTime = Date.now();

  const response = await request.get(baseURL);
  const responseBody = await response.json();

  expect(response.status()).toBe(200);
  expect(Array.isArray(responseBody)).toBeTruthy();
  expect(responseBody.length).toBeGreaterThan(0);

  const responseHeaders = response.headers();
  expect(responseHeaders['content-type']).toContain('application/json');

  const responseSize = (await response.body()).byteLength;
  expect(responseSize).toBeLessThan(4000);

  const responseTime = Date.now() - startingTime;
  expect(responseTime).toBeLessThan(2000);
});

/* ================= POST ================= */
test('post api', async ({ request }) => {
  const payload = {
    name: 'Apple MacBook Pro 16',
    data: {
      year: 2019,
      price: 1849.99,
      'CPU model': 'Intel Core i9',
      'Hard disk size': '1 TB'
    }
  };

  const response = await request.post(baseURL, { data: payload });
  const responseBody = await response.json();

  expect(response.status()).toBe(200);
  expect(responseBody.name).toContain(payload.name);

  objectId = responseBody.id;
  fullpathwithId = `${baseURL}/${objectId}`;

  console.log('Created ID:', objectId);
});

/* ================= PUT ================= */
test('put api', async ({ request }) => {
  const payload = {
    name: 'Apple MacBook Pro 18',
    data: {
      year: 2019,
      price: 2049.99,
      'CPU model': 'Intel Core i9',
      'Hard disk size': '1 TB',
      color: 'silver'
    }
  };

  const response = await request.put(fullpathwithId, { data: payload });
  const responseBody = await response.json();

  expect(response.status()).toBe(200);
  expect(responseBody.name).toContain(payload.name);
});

/* ================= PATCH ================= */
test('patch api', async ({ request }) => {
  const payload = {
    name: 'Apple MacBook Pro Air M4'
  };

  const response = await request.patch(fullpathwithId, { data: payload });
  const responseBody = await response.json();

  expect(response.status()).toBe(200);
  expect(responseBody.name).toContain(payload.name);
});

/* ================= DELETE ================= */
test('delete api', async ({ request }) => {
  const response = await request.delete(fullpathwithId);
  const responseBody = await response.json();

  expect(response.status()).toBe(200);
  expect(responseBody.message).toContain('Object with');
});
