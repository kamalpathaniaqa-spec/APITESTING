/*
How to create Put and Patch Request
-----------------------------------

In Playwright, creating PUT and PATCH requests is very similar to creating a POST request.
The only difference is the HTTP method (request.put() or request.patch()).

PUT is generally used to replace the entire resource.
PATCH is used to update only specific fields of an existing resource (e.g., updating only the name or price).

Sample API server = https://restful-api.dev/
*/

// Import Playwright's core test runner ('test') and assertion engine ('expect')
import { test, expect } from '@playwright/test';

// Define an asynchronous test block named 'PatchDemo' and inject Playwright's built-in 'request' API fixture
test('PatchDemo', async ({ request }) => {

  // Send an HTTP PATCH request to update a specific resource by ID
  const response = await request.patch('https://api.restful-api.dev/objects/ff8081819f7e10ae019f93c5171c1fc6', {
    // Specify HTTP request headers
    headers: {
      'Content-Type': 'application/json',
    },

    // Payload data containing only the specific field(s) to be updated (partial update)
    data: {
      name: 'HP Microprocessor Laptop Pro 21',
    },
  });

  // Playwright Best Practice: Verify response status (2xx OK) before attempting to parse JSON
  expect(response.ok()).toBeTruthy();

  // Asynchronously parse the raw response body into a JavaScript object
  const responsebody = await response.json();

  // Log the resolved JSON object to the console for debugging (no 'await' needed here)
  console.log(responsebody);

  // Assert that the 'name' property in the response matches the updated value
  expect(responsebody.name).toBe('HP Microprocessor Laptop Pro 21');

  // Verify that the server-generated ID exists in the response and is a string
  expect(typeof responsebody.id).toBe('string');
  
});