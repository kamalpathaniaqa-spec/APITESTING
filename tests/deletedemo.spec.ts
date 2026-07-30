/**
 * HOW TO CREATE A DELETE REQUEST
 * ---------------------------------
 * In Playwright API testing, a DELETE request is used to remove a resource from the server.
 *
 * Real-world scenario:
 * Step 1: Create a resource using a POST request.
 * Step 2: Extract the resource ID.
 * Step 3: Delete the same resource using its ID.
 * Step 4: Verify the resource is deleted.
 */

import { test, expect } from '@playwright/test';

// Centralized API Base URL (prevents URL typos and path duplicates)
const BASE_URL = 'https://api.restful-api.dev';

test('Delete Resource', async ({ request }) => {
  // -------------------------------------------------------------
  // STEP 1: CREATE RESOURCE (POST)
  // -------------------------------------------------------------
  const response = await request.post(`${BASE_URL}/objects`, {
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      name: 'HP Microprocessor Laptop Pro 21',
    },
  });

  // Best Practice: Assert request success (2xx status) before parsing JSON
  expect(response.ok()).toBeTruthy();

  // Extract the generated Object ID from response payload
  const responsebody = await response.json();
  const objectid = responsebody.id;
  console.log(`Created Object ID: ${objectid}`);

  // -------------------------------------------------------------
  // STEP 2: DELETE RESOURCE (DELETE)
  // -------------------------------------------------------------
  // Pass the extracted 'objectid' dynamically into the URL endpoint
  const deleteResponse = await request.delete(`${BASE_URL}/objects/${objectid}`);

  // Assert that the server responded with 200 OK for successful deletion
  expect(deleteResponse.status()).toBe(200);

  // -------------------------------------------------------------
  // STEP 3: VERIFY DELETION (GET)
  // -------------------------------------------------------------
  // Try fetching the object again to confirm it returns 404 (Not Found)
  const getResponse = await request.get(`${BASE_URL}/objects/${objectid}`);
  expect(getResponse.status()).toBe(404);
});