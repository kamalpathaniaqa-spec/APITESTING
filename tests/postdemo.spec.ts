/*
Post request (creation and validation)
---------------------------------------
PostRequest is used when we need to create a new record/data on the server.

When a POST request is sent, request data also needs to be sent, which is commonly in JSON format.
Also, a header ('Content-Type') needs to be sent along with the request.
The 'Content-Type' header is an explicit declaration of the type of content being sent by the client 
so the server can process it accordingly.

We will create the POST request, receive the response, and then validate the response.
Sample API Server = https://restful-api.dev/
*/

// Import Playwright's core test runner ('test') and assertion engine ('expect')
import { test, expect } from '@playwright/test';

// Define an asynchronous test block named 'PostDemo' and inject Playwright's built-in 'request' API fixture
test('PostDemo', async ({ request }) => {

  // Send an HTTP POST request to the endpoint to create a new resource on the server
  const response = await request.post('https://api.restful-api.dev/objects', {
    
    // Explicitly declare that the payload body being sent is formatted as JSON
    headers: {
      'Content-Type': 'application/json',
    },

    // The body payload containing the data fields for the new resource to be created
    data: {
      name: 'HP Laptop Pro 19',
      data: {
        year: 2026,
        price: 49990.99,
        'CPU model': 'I5 2nd generation Processor Core 10',
        'Hard disk size': '1 TB',
      },
    },
  });

  // Playwright Best Practice: Verify response status (2xx success) before attempting to parse JSON
  expect(response.ok()).toBeTruthy();

  // Asynchronously parse the raw response body into a JavaScript object
  const responsebody = await response.json();

  // Log the created object to the console for debugging
  console.log(responsebody);

  // Assert that the 'name' field in the returned object matches what was sent in the request
  expect(responsebody.name).toBe('HP Laptop Pro 19');

  // Assert that the server automatically generated a unique ID and returned it as a string
  expect(typeof responsebody.id).toBe('string');

  // Assert that the nested 'data' object completely matches the original properties sent
  expect(responsebody.data).toEqual({
    year: 2026,
    price: 49990.99,
    'CPU model': 'I5 2nd generation Processor Core 10',
    'Hard disk size': '1 TB',
  });

});