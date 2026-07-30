/**
 * HOW TO HANDLE NESTED RESPONSE ASSERTIONS
 * -----------------------------------------
 * API URL: https://jsonplaceholder.typicode.com/users
 * Response: Array of nested user objects (including address, geo, company)
 */

// Import Playwright's core test runner ('test') and assertion engine ('expect')
import { test, expect } from '@playwright/test';

// Define the async test block and inject Playwright's built-in 'request' API fixture
test('Nested Response Assertions', async ({ request }) => {

  // Step 1: Send an HTTP GET request to fetch the users array from the REST API endpoint
  const response = await request.get('https://jsonplaceholder.typicode.com/users');

  // Step 2: Playwright Best Practice - Assert HTTP status is in the 200-299 range before parsing JSON
  expect(response.ok()).toBeTruthy();

  // Step 3: Asynchronously parse the raw HTTP response body into a JavaScript array of objects
  const users = await response.json();

  // Step 4: Validate top-level data types - check that response is an array and contains at least one item
  expect(Array.isArray(users)).toBeTruthy();
  expect(users.length).toBeGreaterThan(0);

  // Step 5: Loop through each user object in the array to perform schema/structure validation
  for (const user of users) {

    // Use 'toMatchObject' with asymmetric matchers (expect.any / expect.stringMatching)
    // to validate structural types without needing to hardcode exact dynamic values
    expect(user).toMatchObject({
      id: expect.any(Number),          // Validates 'id' exists and is a number
      name: expect.any(String),        // Validates 'name' exists and is a string
      username: expect.any(String),    // Validates 'username' exists and is a string
      
      // Use regex matching to verify the email string follows a basic format containing '@'
      email: expect.stringMatching(/@/),

      // Nested Object Validation: Address & Geo
      // Playwright recursively checks child keys inside 'address' and 'geo'
      address: {
        street: expect.any(String),
        suite: expect.any(String),
        city: expect.any(String),
        zipcode: expect.any(String),
        geo: {
          lat: expect.any(String),     // Validates latitude string in nested geo object
          lng: expect.any(String),     // Validates longitude string in nested geo object
        },
      },

      phone: expect.any(String),
      website: expect.any(String),

      // Partial Nested Object Validation: Company
      // Note: 'toMatchObject' allows checking a subset of keys (like 'name') 
      // without failing on unlisted sibling keys like 'catchPhrase' or 'bs'
      company: {
        name: expect.any(String),
      },
    });
  }

});