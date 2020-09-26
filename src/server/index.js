// Setup empty JS object to act as endpoint for all routes
projectList = []

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
var bodyParser = require('body-parser')

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));



// TODO-ROUTES!

app.get('/all', function(request, response) {
    response.send(projectList);
});

app.post('/add', addProject);

function addProject(req, res) {
    console.log(req.body);
    projectList.push(req.body);
    res.send(req.body);
    console.log(projectList)
}

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})