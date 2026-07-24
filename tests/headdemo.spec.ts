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




import {test,expect}from '@playwright/test'

test('Head Request', async({request})=>{

const response = await request.head('https://jobs.postmanatwork.com/jobs');
console.log(response);
console.log(response.status());
console.log(response.statusText());
console.log(response.headers()['content-type']);
console.log(response.headers()['server']);
console.log(await response.text());




})