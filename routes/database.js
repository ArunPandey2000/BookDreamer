// DB Object

const db = { }

// Setup SQL
const sequelize = require( 'sequelize' )

// db.sequelize = sequelize
db.conn = new sequelize('bookrec', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
	host: 'localhost',
	dialect: 'postgres'
})

//>>>>>>>>>>> MODELS

db.book = db.conn.define('book', {
	title: sequelize.STRING,
	author: sequelize.STRING,
	genre: sequelize.ARRAY(sequelize.STRING),
	pages: sequelize.INTEGER,
	linkid: sequelize.INTEGER,
	series: sequelize.BOOLEAN,
	published: sequelize.INTEGER,
	language: sequelize.STRING,
	rating: sequelize.FLOAT,
	summary: sequelize.TEXT,
	isbn: sequelize.STRING
})

// Create test User
db.conn.sync({force: false})

module.exports = db

