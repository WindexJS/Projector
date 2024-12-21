/** 
 * Project Name: Projector
 * Author: George Howitt
 * Date: 21/12/2024
 * Description: A program used to manage WordPress installations
 */

/** 
 * Essential Modules
*/
const express = require('express');
const fs = require('fs');
const cp = require('child_process');
const colors  = require('colors');
const path = require('path');
const bodyParser = require('body-parser');

/**
 * Required Modules
 */
require('dotenv').config();

/**
 * Global Variables
 */
global.server_port = process.env.PORT;
global.server_online_message = process.env.SERVER_ONLINE_MESSAGE;

/** 
 * Time Variables
 */
const current_date = new Date();
current_year = current_date.getFullYear();
current_month = current_date.getMonth(); 
current_day = current_date.getDate();
current_hour = current_date.getHours();
current_minute = current_date.getMinutes();
current_second = current_date.getSeconds();

/** 
 * Server Start
 */

// Launch Application
const projector_server = express();

// Listen on Port
projector_server.listen(server_port, () => {
    log(server_online_message);
    log(`Server started on ` + colors.blue(`http://localhost:${server_port}`));
    log(`Current Date: ` + colors.blue(`${current_day}/${current_month}/${current_year}`));
    log(`Current Time: ` + colors.blue(`${current_hour}:${current_minute}:${current_second}`));
});

/**
 * Routes
 */

// Home
projector_server.get('/', (req, res) => {
    access(`Path Requested: ` + colors.yellow(`${req.url}`));
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

// Login
projector_server.get('/login', (req, res) => {
    access(`Path Requested: ` + colors.yellow(`${req.url}`));
    res.sendFile(path.join(__dirname, '/views/login/index.html'));
});

/** 
 * Log Functions
 */

// Normal Log
function log(message) {
    console.log(colors.green(`[${current_hour}:${current_minute}:${current_second}] `) + message);
}

// Error Log
function error(message) {
    console.log(colors.red(`[${current_hour}:${current_minute}:${current_second}] `) + message);
}

// Warning Log
function warning(message) {
    console.log(colors.yellow(`[${current_hour}:${current_minute}:${current_second}] `) + message);
}

// Access Log
function access(message) {
    console.log(colors.blue(`[${current_hour}:${current_minute}:${current_second}] `) + message);
}

/**
 * Error Catching
 */

// Error handling middleware
projector_server.use((err, req, res, next) => {
    if (err.code === 'ENOENT') {
        res.status(404).send('File not found!');
        error('Error 404: File not found: ' + colors.yellow(`${req.url}`));
    } else {
        res.status(500).send('Internal Server Error');
        error('Error 500: Internal Server Error: ' + colors.yellow(`${req.url}`));
    }
});

// Catch-all route for handling 404 errors
projector_server.use((req, res) => {
    res.status(404).send('Page not found!');
    error('Error 404: Page not found: ' + colors.yellow(`${req.url}`));
});