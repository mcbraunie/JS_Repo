/*
 * Name: MB
 * Class: CSD 122
 * Date: 12/2/2021
 * Assingment: Course Final Project
 * File: ./public/app.js
 */

// instantiate puppeteer 
const puppeteer = require('puppeteer');
//const { promisify } = require('util');

// function call for puppeteer
async function launchSearch(){
    // website that generates random words where the words will come from
    // Old site: link no longer safe
    // const url = 'https://www.sodacoffee.com/words/list-generator';
    // New site: need to update div/id's
    const url = 'https://randomwordgenerator.com/';
    // button div id to click and generate more word searches
    const buttonClick = '#ctl00_ContentPane_btn';
    // div id for the drop-down selector on the url asking how many results we want
    const numResultsPerClick = '#ctl00_ContentPane_resultscounter';
    // puppeteer browser launch options
    const browser = await puppeteer.launch({
        // headless == no graphical representation of the browser
        headless: true,
    });

    // create new browser element named page
    const page = await browser.newPage();
    // go to word generator URL
    await page.goto(url);
    // variable searches DOM for div id (declared above)
    const numWordsScrape = await page.$(numResultsPerClick);
    // select the element
    await numWordsScrape.click()
    // type 50 to return 50 random words
    await numWordsScrape.type('50');
    // to prevent some errors due to promises, Promise.all() seemed to be best to get results
    await Promise.all([
        // wait until the page has loaded (url)
        page.waitForNavigation(),
        // click button
        page.click(buttonClick)
    ])
    // site *should* have advanced forward to the next page with 50 results 
    const textAfterButtonClick = await page.evaluate(
        // create an array from the results of the query to the DOM, and map those specific elements <tr> -> to their inner text values
        () => Array.from(document.querySelectorAll('#ctl00_ContentPane_GridView1 tbody tr')
        ).map((elem) => elem.innerText.trim())
    );

    arrayToCSV(textAfterButtonClick);
    // close instance of browser
    await browser.close();
}

launchSearch();
//readFile();

// pushes data from URL-to-csv
function arrayToCSV(arr){
    const fs = require('fs');
    const writeToFile = arr;
    //console.log(writeToFile.length);
    const writeStream = fs.createWriteStream('random.csv');
    writeStream.write(writeToFile.join(','));
    writeStream.close();
}
