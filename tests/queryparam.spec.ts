/*  Basic Get Request along with Query Parameter

What is query parameter?
A query parameter is used to filter the response data in an API  request.
*/

//


import {test,expect} from '@playwright/test'


test('QueryParameter', async({request})=>{

const response = await request.get('https://jobs.postmanatwork.com/jobs',{

params:{
    location: 'San Francisco',
    country: 'CA'
}

});
console.log(await response.json());


})