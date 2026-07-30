/**
 * HOW TO PERFORM RESPONSE ASSERTION
 * ------------------------------------
 * API URL: https://jsonplaceholder.typicode.com/posts/
 * Objective: Validate status code, check array structure & length, and enforce schema types on every post object.
 */

// Import Playwright's core test runner ('test') and assertion engine ('expect')
import { test, expect } from '@playwright/test';

// Define an asynchronous test block named 'Response check' and inject Playwright's built-in 'request' API fixture
test('Response check', async ({ request }) => {

  // Step 1: Send an HTTP GET request to fetch the posts array from JSONPlaceholder API
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/');

  // Playwright Best Practice: Assert HTTP status is in the 200-299 range before parsing JSON
  expect(response.ok()).toBeTruthy();

  // Step 2: Asynchronously parse the raw response body into a JavaScript array of objects
  const responseBody = await response.json();

  // Step 3: Assert that the top-level response structure is a valid JavaScript array
  expect(Array.isArray(responseBody)).toBeTruthy();

  // Step 4: Assert that the array contains exactly 100 items returned by the server
  expect(responseBody).toHaveLength(100);

  // Step 5: Loop through each post item in the array to perform schema/structure validation
  for (const post of responseBody) {

    // Use 'toMatchObject' with asymmetric matchers (expect.any) to validate data types dynamically
    expect(post).toMatchObject({
      userId: expect.any(Number), // Validates 'userId' exists and is a number
      id: expect.any(Number),     // Validates 'id' exists and is a number
      title: expect.any(String),  // Validates 'title' exists and is a string
      body: expect.any(String),   // Validates 'body' exists and is a string
    });

  }

});