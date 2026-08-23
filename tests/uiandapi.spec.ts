/**
 * API Testing using playwright -- Combine UI and API Testing
 * 
 * example :- I will use Github API and UI to implementation this concept
 * 
 * scenario:
 * Will Create Github Repository using API
 * Then will validate the repository from the UI.
 *   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
 */

  import { test, expect}from '@playwright/test';

   const API_BASE_URL = 'https://api.github.com';
   const GITHUB_USERNAME = 'kamalpathaniaqa-spec';
   const UI_BASE_URL = 'https://github.com/kamalpathaniaqa-spec?tab=repositories';
   const REPONAME = `UIPLUSAPI-${Date.now()}`; // Unique name to prevent duplicate creation errors
   const TOKEN = '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'; // Replace with a valid GitHub Personal Access Token

   test.describe('Ui with Api' , ()=>{


    test('create repo Test', async({request})=>{

     const response = await request.post(`${API_BASE_URL}/user/repos`,{

        headers:
        {
         'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28', // Standard GitHub REST API version
      },

        data:{
          "name":`${REPONAME}`,
          "description": "This is your first repo"

        }
     })
 })
   
 test('ui validation' , async({page})=>{

   await page.goto(UI_BASE_URL);
    await page.screenshot({ path: 'uiandapi.png' });
   const reponame =  await page.locator('.wb-break-all a').first().textContent();
   expect(reponame?.trim()).toBe( REPONAME);
 })

  });

