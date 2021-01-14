// Setup empty JS object to act as endpoint for all routes
// Cors for cross origin allowance
const cors = require('cors');
const dotenv = require('dotenv');
var path = require('path');

const PORT = process.env.PORT || 5000;
dotenv.config();


// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Initialize the main project folder - use dist
app.use(express.static('dist'));

/* Middleware*/
var bodyParser = require('body-parser')

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(cors());

let projectList = []

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

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
});


// designates what port the app will listen to for incoming requests
app.listen(PORT, function () {
    console.log('Example app listening on port 5000!')
});