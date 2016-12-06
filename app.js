// Set up libraries
const sequelize 	= require('sequelize')
const express 		= require('express')
const bodyParser 	= require('body-parser')
const session 		= require('express-session')
const pug			= require('pug')
const pg 			= require('pg')
// const bcrypt		= require('bcrypt-node')
const sass			= require('node-sass')
const db			= require(__dirname + '/routes/database.js')

const app			= express()

app.set( 'view engine', 'pug')
app.set( 'views', __dirname + '/views' )

// Routes
let searchRoute 		= require(__dirname + '/routes/search')
let resultRoute			= require(__dirname + '/routes/result')

app.use( express.static('static'))
app.use( bodyParser.urlencoded({extended: true}))
app.use(session({
	secret: 'security is important',
	resave: true,
	saveUninitialized: false
}))

// Routes
app.use( searchRoute )
app.use( resultRoute )

//listen port 8000
app.listen(8000, () => {
	console.log('Server is running')
})