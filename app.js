// Set up libraries
const sequelize 	= require('sequelize')
const express 		= require('express')
const bodyParser 	= require('body-parser')
const session 		= require('express-session')
const pug			= require('pug')
const pg 			= require('pg')
const sass			= require('node-sass')
const db			= require(__dirname + '/routes/database.js')

const app			= express()

app.set( 'view engine', 'pug')
app.set( 'views', __dirname + '/views' )

// Routes
let searchRoute 		= require(__dirname + '/routes/search')
let findJsonRoute		= require(__dirname + '/routes/findJson')

app.use( express.static('static'))
app.use( bodyParser.urlencoded({extended: true}))

// Routes
app.use( searchRoute )
app.use( findJsonRoute )

//listen port 8000
app.listen(8000, () => {
	console.log('Server is running')
})