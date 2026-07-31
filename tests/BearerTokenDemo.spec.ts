/*
 Authorization using Bearer Token
 ---------------------------------

 A bearer token is asecurity token that is used to authorize the user to access the protected resources.

 The token contains encrypted information such as.
--user identity
--roles
--permissions
--token expiry

How it works
-------------
After a user authenticates, the server provides a bearer token.
User includes that token in the authorization header of request.
The server then validates the token to grant access.

Example
https://gorest.co.in/

First we will get Bearer Token by login and will use that token in the request.

*/

// Import Playwright's core test runner ('test') and assertion engine ('expect')
import{test,expect}from '@playwright/test'

// Define an asynchronous test block and inject Playwright's built-in 'request' API fixture
test('Bearer Token',async({request})=>{

    // Generate a dynamic email to avoid duplicate email errors on repeated test runs
  const randomEmail = `krishnna_${Date.now()}@example.com`;

// Send an HTTP POST request to create a user using Bearer Token authorization
 const response = await request.post('https://gorest.co.in/public/v2/users',{

 // Pass the required headers including Authorization and Accept
  headers:{
   'Authorization':'Bearer c6ee8edad9a10ae40290aff75b6e350bbc19a8a837afca6e4998834ea9f63f56',
   'Accept': 'application/json',

  },
  // Payload data required to create a new user record
   data:{
  "name": "Krishna Ramakrishna",
  "email": randomEmail,
  "gender": "male",
  "status": "active"
   }

  })
  // Log response status code (201 Created on success) and status text
  console.log(response.status());
  console.log(response.statusText());
  
  // Playwright Best Practice: Assert that the request was authorized and succeeded (201 Created)
  expect(response.status()).toBe(201);
  expect(response.ok()).toBeTruthy();

  // Asynchronously parse and validate the created user object
  const responseBody = await response.json();
  console.log('Created User Payload:', responseBody);

  // Assertions on the response body
  expect(responseBody).toHaveProperty('id');
  expect(responseBody.name).toBe('Krishna Ramakrishna');
  expect(responseBody.email).toBe(randomEmail);

});