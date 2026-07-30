
 /* 
    UNDERSTANDING 'REQUEST' FIXTURE
    ---------------------------------
 In a playwright test, A fixture is an object that playwright creates and provides to your
 test automatically.
 The request fixture is type :ApiRequestContext

 Request is built in fixture that provides an APIRequestContext object for making HTTP request such as 
 GetAnimationsOptions, POST ,PUT , PATCH, AND delete
 Think of it as Playwright  built in Api client Information */



// Import Playwright's core test runner ('test') and assertion library ('expect')
import { test, expect } from '@playwright/test';

// Define an asynchronous test block named 'BasicTest' and inject the built-in 'request' API fixture
test('BasicTest', async ({ request }) => {

  // Send an HTTP GET request to the specified URL and await the server's APIResponse object
  const response = await request.get('https://jobs.postmanatwork.com/jobs');

  // Parse the raw response body into a JavaScript JSON object and log it to the console for debugging
  console.log(await response.json());

  // Assert that the HTTP response status code is 200 (OK) to verify the API request succeeded
  expect(response.status()).toBe(200);

});