/*Use of Faker Library to generate dynamic data
-------------------------------------------------
Using Faker with playwright with Playwright API Testing is one 
of the best ways to generate dynamic test data for POST, PUT and Patch requests.

It prevant conficts caused by duplicate data and make your api tests more realistic.

Step 1: Install Faker
npm install@faker-js/faker

Step 2: Import Fker
import{faker} from '@faker-js/faker';

Step 3: Generate Dynamic Test Data

Step 4: Use in Playwright Post api

every execution generates new data.
*/
 import {test, expect} from '@playwright/test'
 import {faker} from '@faker-js/faker'

 test('Faker data',async ({request})=>{
    const requestbody ={
    "name": faker.person.fullName(),
    "email": faker.internet.email(),
    "gender": "male", 
    "status": "active" }
    
  const  res = await request.post('https://gorest.co.in/public/v2/users',
    {
        headers:{
         'Authorization': 'Bearer c6ee8edad9a10ae40290aff75b6e350bbc19a8a837afca6e4998834ea9f63f56',
         'Accept': 'application/json'
        },

        data: requestbody
    }

  )
   //expect(res.status()).toBe(201);
   const resbody = await res.json();
   console.log(resbody);
 })