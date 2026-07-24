
 /* 
    UNDERSTANDING 'REQUEST' FIXTURE
    ---------------------------------
 In a playwright test, A fixture is an object that playwright creates and provides to your
 test automatically.
 The request fixture is type :ApiRequestContext

 Request is built in fixture that provides an APIRequestContext object for making HTTP request such as 
 GetAnimationsOptions, POST ,PUT , PATCH, AND delete
 Think of it as Playwright  built in Api client Information */



import {test, expect} from '@playwright/test'

test('BasicTest',async({request})=>{

const response = await request.get('https://jobs.postmanatwork.com/jobs')
console.log(await response.json());
await expect(response.status()).toBe(200);


})