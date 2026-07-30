/*
How to create Put and Patch Request
-----------------------------------

In Playwright, creating PUT and PATCH requests is very similar to creating a POST request.
The only difference is the HTTP method (request.put() or request.patch()).

PUT is generally used to replace the entire resource.
PATCH is used to update only specific fields of an existing resource.

E.g., Update the full object schema with new values.
We will create the PUT request, receive the response, and validate the updated response.
Sample API server = https://restful-api.dev/
*/

// Import Playwright's core test runner ('test') and assertion engine ('expect')
import { test, expect } from '@playwright/test';

// Define an asynchronous test block named 'PutDemo' and inject Playwright's built-in 'request' API fixture
test('PutDemo', async ({ request }) => {

  // Send an HTTP PUT request to replace the full resource object specified by the ID endpoint
  const response = await request.put('https://api.restful-api.dev/objects/ff8081819f7e10ae019f93c5171c1fc6', {
    
    // Explicitly declare that the request body being sent is formatted as JSON
    headers: {
      'Content-Type': 'application/json',
    },

    // The full payload replacement data to overwrite the target resource on the server
    data: {
      name: 'ASUS Laptop Pro 19',
      data: {
        year: 2026,
        price: 49999.99,
        'CPU model': 'I5 2nd generation Processor Core 10',
        'Hard disk size': '1 TB',
      },
    },
  });

  // Playwright Best Practice: Verify response status (2xx success) before attempting to parse JSON
  expect(response.ok()).toBeTruthy();

  // Asynchronously parse the raw HTTP response body into a JavaScript object
  const responsebody = await response.json();

  // Log the updated object response to the console for debugging
  console.log(responsebody);

  // Assert that the 'name' field in the returned object matches the newly updated value
  expect(responsebody.name).toBe('ASUS Laptop Pro 19');

  // Assert that the resource ID is present in the response and is formatted as a string
  expect(typeof responsebody.id).toBe('string');

  // Assert that the nested 'data' object completely matches the full payload structure sent
  expect(responsebody.data).toEqual({
    year: 2026,
    price: 49999.99,
    'CPU model': 'I5 2nd generation Processor Core 10',
    'Hard disk size': '1 TB',
  });

});