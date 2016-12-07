// DB Object

const db = { }

// Setup SQL
const sequelize = require( 'sequelize' )
// const bcrypt 	= require('bcrypt-node')

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
	language: sequelize.STRING
})


// Define relationships between tables


// Create test User
db.conn.sync({force: true}).then( database => {
	db.book.create({
		title: "Harry Potter and the Sorcerer's Stone(Harry Potter #1)",
		author: "J.K. Rowling",
		genre: ["Fantasy", "Young Adult", "Fiction"],
		pages: 320,
		linkid: 3,
		series: true,
		published: 1997,
		language: "English"
	})
	db.book.create({
		title: "The Hitchhiker's Guide to the Galaxy",
		author: "Adam Douglas",
		genre: ["Science Fiction", "Humor", "Fiction"],
		pages: 216,
		linkid: 11,
		series: true,
		published: 1995,
		language: "English"
	})
	db.book.create({
		title: "Mansfield Park",
		author: "Jane Austen",
		genre: ["Classics", "Romance", "Fiction"],
		pages: 560,
		linkid: 45032,
		series: false,
		published: 2003,
		language: "English"
	})
	db.book.create({
		title: "The Magician's Guild(The Black Magician Trilogy #1)",
		author: "Trudi Canavan",
		genre: ["Fantasy", "Young Adult", "Fiction"],
		pages: 467,
		linkid: 28249,
		series: true,
		published: 2004,
		language: "English"
	})
	db.book.create({
		title: "Murder at the Vicarage(Miss Marple #1)",
		author: "Agatha Christie",
		genre: ["Mystery", "Classics", "Fiction"],
		pages: 288,
		linkid: 16331,
		series: true,
		published: 2006,
		language: "English"
	})
	db.book.create({
		title: "A Tale of Two Cities",
		author: "Charles Dickens",
		genre: ["Classics", "Literature", "Fiction"],
		pages: 489,
		linkid: 1953,
		series: false,
		published: 2003,
		language: "English"
	})
	db.book.create({
		title: "Gone Girl",
		author: "Gillian Flynn",
		genre: ["Mystery", "Thriller", "Fiction"],
		pages: 555,
		linkid: 19288043,
		series: false,
		published: 2014,
		language: "English"
	})
	db.book.create({
		title: "Outlander(Outlander #1)",
		author: "Diana Gabaldon",
		genre: ["Romance", "Historical Fiction", "Fantasy"],
		pages: 896,
		linkid: 10964,
		series: true,
		published: 2005,
		language: "English"
	})
	db.book.create({
		title: "The Silence of the Lambs(Hannibal Lecter #2)",
		author: "Thomas Harris",
		genre: ["Horror", "Thriller", "Fiction"],
		pages: 338,
		linkid: 23807,
		series: true,
		published: 2002,
		language: "English"
	})
	db.book.create({
		title: "The Kite Runner",
		author: "Khaled Hosseini",
		genre: ["Contemporary", "Historical Fiction", "Fiction"],
		pages: 371,
		linkid: 77203,
		series: false,
		published: 2004,
		language: "English"
	})
	db.book.create({
		title: "Les Miserables",
		author: "Victor Hugo",
		genre: ["Classics", "Literature", "Fiction"],
		pages: 1463,
		linkid: 24280,
		series: false,
		published: 1987,
		language: "English"
	})
	db.book.create({
		title: "It",
		author: "Stephen King",
		genre: ["Horror", "Fantasy", "Fiction"],
		pages: 1116,
		linkid: 830502,
		series: false,
		published: 1987,
		language: "English"
	})
	db.book.create({
		title: "Air Awakens(Air Awakens #1)",
		author: "Elisa Kova",
		genre: ["Fantasy", "Young Adult", "Magic"],
		pages: 377,
		linkid: 23127048,
		series: true,
		published: 2015,
		language: "English"
	})
	db.book.create({
		title: "Prince of Thorns(The Broken Empire #1)",
		author: "Mark Lawrence",
		genre: ["Fantasy", "Dark Fantasy", "Fiction"],
		pages: 384,
		linkid: 9579634,
		series: true,
		published: 2011,
		language: "English"
	})
	db.book.create({
		title: "To Kill a Mockingbird(To Kill a Mockingbird #1)",
		author: "Harper Lee",
		genre: ["Classics", "Historical Fiction", "Fiction"],
		pages: 324,
		linkid: 2657,
		series: true,
		published: 2006,
		language: "English"
	})
	db.book.create({
		title: "I Am Number Four(Lorien Legacies #1)",
		author: "Pittacus Lore",
		genre: ["Fantasy", "Young Adult", "Science Fiction"],
		pages: 452,
		linkid: 7747374,
		series: true,
		published: 2010,
		language: "English"
	})
	db.book.create({
		title: "Life of Pi",
		author: "Yann Martel",
		genre: ["Fantasy", "Adventure", "Fiction"],
		pages: 460,
		linkid: 4214,
		series: false,
		published: 2006,
		language: "English"
	})
	db.book.create({
		title: "The World of Ice & Fire: The Untold History of Westeros and the Game of Thrones(A Song of Ice and Fire)",
		author: "George R.R. Martin",
		genre: ["Fantasy", "Epic Fantasy", "Fiction"],
		pages: 326,
		linkid: 17345242,
		series: true,
		published: 2014,
		language: "English"
	})
	db.book.create({
		title: "Cinder(The Lunar Chronicles #1)",
		author: "Marissa Meyer",
		genre: ["Fantasy", "Young Adult", "Science Fiction"],
		pages: 395,
		linkid: 11235712,
		series: true,
		published: 2012,
		language: "English"
	})
	db.book.create({
		title: "Gone with the Wind",
		author: "Margaret Mitchell",
		genre: ["Classics", "Historical Fiction", "Fiction"],
		pages: 1037,
		linkid: 18405,
		series: false,
		published: 1999,
		language: "English"
	})
	db.book.create({
		title: "The Night Circus",
		author: "Erin Morgenstern",
		genre: ["Fantasy", "Romance", "Fiction"],
		pages: 400,
		linkid: 9361589,
		series: false,
		published: 2011,
		language: "English"
	})
	db.book.create({
		title: "Summer, Fireworks, and My Corpse",
		author: "Otsuichi",
		genre: ["Horror", "Asian Literature", "Short Stories"],
		pages: 350,
		linkid: 7326853,
		series: false,
		published: 2010,
		language: "English"
	})
	db.book.create({
		title: "The Casual Vacancy",
		author: "J.K. Rowling",
		genre: ["Fiction", "Contemporary", "Mystery"],
		pages: 503,
		linkid: 13497818,
		series: false,
		published: 2012,
		language: "English"
	})
	db.book.create({
		title: "The Dream of the Red Chamber",
		author: "Cao Xueqin",
		genre: ["Classics", "Fiction", "Asian Literature"],
		pages: 352,
		linkid: 535739,
		series: false,
		published: 1958,
		language: "Chinese"
	})
})


module.exports = db

