// Set up libraries

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const pug = require('pug');

const db = require(__dirname + '/routes/database.js');

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// Routes
const searchRoute = require(__dirname + '/routes/search');
const findJsonRoute = require(__dirname + '/routes/findJson');

app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use(searchRoute);
app.use(findJsonRoute);

//listen port 8000
app.listen(8000, () => {
  console.log('Server is running');
});
