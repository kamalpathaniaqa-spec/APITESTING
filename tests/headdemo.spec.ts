/** how to create Head REquest
 * API response has  two parts.
 * Response Header and Response body
 * 
 * When hit a HEAD request.
 * ---server returns only the response header
 * ---server doesnt return the respone body.
 * 
 * GET --Return header + body and higher bandwidth also have response body.
 * HEAD --Returns headers body and lower bandwidth and response body should empty.
 * 
 * 
 * why was HEAD introduction.
 * --------------------------
 * Imagine a file download website
 * suppose a pdf is 800mb
 * if you only want to know
 * 
 * does file exist?
 * How big is it?
 * Last Modified data?
 * Contenet type?
 * 
 * Downloading 800mb just to kniw this would be wasteful
 * 
 * instead:
 * HEAD/sample.pdf
 * server replies
 * 200 ok
 * content length: 8000000
 * last-Modified:25 july 2026
 * content-type: application/pdf
 * No file downloded. veryfast.
 */




import { test, expect } from '@playwright/test';

test('Head Request - Validate metadata without body', async ({ request }) => {
  // Send HTTP HEAD request to fetch headers only
  const response = await request.head('https://jobs.postmanatwork.com/jobs');

  // Assert HTTP status code and status text
  expect(response.status()).toBe(200);
  expect(response.statusText()).toBe('OK');
  expect(response.ok()).toBeTruthy();

  // Inspect and assert specific response headers
  const headers = response.headers();
  console.log('Content-Type:', headers['content-type']);
  console.log('Server:', headers['server']);

  expect(headers['content-type']).toContain('application/json');

  // Assert response body is completely empty for a HEAD request
  const bodyText = await response.text();
  console.log('Body Text:', bodyText); // Should print empty string ""
  expect(bodyText).toBe('');
});


