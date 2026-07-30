/**
 * Request Chaining for End to End API Test Flow
 * ----------------------------------------------
 * "A real API project always follows CRUD Opeartions:
 * Create, Read , Update and Delete".
 * In This test, we automate exactly the same flow end-to-end.'
 * 
 * What we will do:
 * 1. Create Product--> Extract ID from response
 * 2. Validate the created product by ID
 * 3. Update (Patch)--> Validate update
 * 4. Delete Product --> Validate deletion
 * 5. Conform product not found
 * https://restful-api.dev/
 * 
 */

// Import Playwright's core test runner ('test') and assertion library ('expect')
import { test, expect } from '@playwright/test';

// Centralized API base URL without trailing slash to prevent double-slash pathing issues
const BASEURL = 'https://api.restful-api.dev';

// Define the async test block and inject Playwright's built-in 'request' (APIRequestContext) fixture
test('chaining Demo', async ({ request }) => {

  // ==========================================
  // STEP 1: CREATE PRODUCT (POST) & EXTRACT ID
  // ==========================================
  const postresponse = await request.post(`${BASEURL}/objects`, {
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      name: 'DELL LAPTOPS',
      data: {
        year: 2026,
        price: 49999,
        'CPU model': 'i7 6th generation',
        'Hard disk size': '10TB',
      },
    },
  });

  // Verify POST request succeeded before parsing response body
  expect(postresponse.ok()).toBeTruthy();

  // Parse response body to extract the dynamically generated product ID
  const postresponsebody = await postresponse.json();
  const productID = postresponsebody.id;
  console.log(`Created Product ID: ${productID}`);


  // ==========================================
  // STEP 2: VALIDATE CREATED PRODUCT (GET)
  // ==========================================
  // Use the extracted productID to fetch product details
  const getresponse = await request.get(`${BASEURL}/objects/${productID}`);
  
  // Assert that the GET request returned a 200 OK status
  expect(getresponse.status()).toBe(200);


  // ==========================================
  // STEP 3: UPDATE PRODUCT NAME (PATCH)
  // ==========================================
  // Send a partial update request targeting the specific productID
  const patchresponse = await request.patch(`${BASEURL}/objects/${productID}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      name: 'HP LAPTOPS',
    },
  });

  // Parse PATCH response body and assert the name property updated successfully
  const patchresponsebody = await patchresponse.json();
  expect(patchresponsebody.name).toBe('HP LAPTOPS');


  // ==========================================
  // STEP 4: DELETE PRODUCT (DELETE)
  // ==========================================
  // Remove the product from the database using its productID
  const deleteresponse = await request.delete(`${BASEURL}/objects/${productID}`);
  
  // Assert that the deletion succeeded (200 OK)
  expect(deleteresponse.status()).toBe(200);


  // ==========================================
  // STEP 5: CONFIRM DELETION (GET AFTER DELETE)
  // ==========================================
  // Try fetching the deleted product to verify it no longer exists
  const getdeleteresponse = await request.get(`${BASEURL}/objects/${productID}`);
  
  // Assert that the resource is not found (404 Not Found)
  expect(getdeleteresponse.status()).toBe(404);

});