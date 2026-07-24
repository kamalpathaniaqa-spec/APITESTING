/** 
 * Ho to create delete request 
 * -----------------------------
 * In playwright  PAI testing, a DELETE request is used to remove a resource from the server.
 * 
 * Real worl scenario
 * step 1 -create a resource using POst Request
 * step 2 - Delete the same resource 
 *  sample api server = https//restful-api.dev/
 * 
 *  */
 import{test,expect} from '@playwright/test'
 
 test('Delete Resource' , async({request})=>{

const response = await request.post('https://api.restful-api.dev/objects', {
    
    headers:{
        'Content-Type': 'application/json'
    },

    data:{
      name: 'HP Microprocerssor Laptop Pro 21',
    }
 })
  const responsebody = await response.json();
  const objectid = responsebody.id;
  console.log(objectid);

  const deleteResponse = await request.delete(`https://api.restful-api.dev/objects/${objectid}`);
  expect(deleteResponse.status()).toBe(200);
  });

