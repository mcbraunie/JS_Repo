/*
 * Name: MB
 * Class: CSD 122
 * Date: 12/2/2021
 * Assingment: Course Final Project
 * File: ./server.js
 */

// run server with "nodemon server.js"
// instantiate express
const express = require('express');

// start an express server named app
const app = express();

// create a router to route requests
const router = express.Router();

// assists with relative path directories
const path = require('path');

// route to port number
let port = 8080;

/*
Files to be served to router.get()
Static files:
    index.html
    styles.css
    app.js
*/

// folder for express to use to serve files
app.use(express.static('public'));

// define route to homepage
router.get('/', (request, response) => {
    //response.json('It works!');
    response.sendFile(path.join(__dirname, './index.html'));
});

// wildcard routing -- if page not found
router.get("*", (request, response) => {
    response.json("Page not found");
});

// listen for connections on port
app.listen(port, () => {
    console.log(`Express is running on port: ${port}`);
});