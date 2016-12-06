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
	pages: sequelize.INTEGER
})


// Define relationships between tables


// Create test User
db.conn.sync({force: true}).then( database => {
	db.book.create({
		title: "Harry Potter and the Sorcerer's Stone",
		author: "J.K. Rowling",
		genre: ["Fantasy", "Young Adult", "Fiction"],
		pages: 320
	})
	db.book.create({
		title: "The Hitchhiker's Guide to the Galaxy",
		author: "Adam Douglas",
		genre: ["Science Fiction", "Humor", "Fiction"],
		pages: 216
	})
	db.book.create({
		title: "Mansfield Park",
		author: "Jane Austen",
		genre: ["Classics", "Romance", "Fiction"],
		pages: 560
	})
	db.book.create({
		title: "The Magician's Guild(The Black Magician Trilogy #1)",
		author: "Trudi Canavan",
		genre: ["Fantasy", "Young Adult", "Fiction"],
		pages: 467
	})
	db.book.create({
		title: "Murder at the Vicarage(Miss Marple #1)",
		author: "Agatha Christie",
		genre: ["Mystery", "Classics", "Fiction"],
		pages: 288
	})
	db.book.create({
		title: "A Tale of Two Cities",
		author: "Charles Dickens",
		genre: ["Classics", "Literature", "Fiction"],
		pages: 489
	})
	db.book.create({
		title: "Gone Girl",
		author: "Gillian Flynn",
		genre: ["Mystery", "Thriller", "Fiction"],
		pages: 555
	})
	db.book.create({
		title: "Outlander",
		author: "Diana Gabaldon",
		genre: ["Romance", "Historical Fiction", "Fantasy"],
		pages: 896
	})
	db.book.create({
		title: "The Silence of the Lambs(Hannibal Lecter #2)",
		author: "Thomas Harris",
		genre: ["Horror", "Thriller", "Fiction"],
		pages: 338
	})
	db.book.create({
		title: "The Kite Runner",
		author: "Khaled Hosseini",
		genre: ["Contemporary", "Historical Fiction", "Fiction"],
		pages: 371
	})
	db.book.create({
		title: "Les Miserables",
		author: "Victor Hugo",
		genre: ["Classics", "Literature", "Fiction"],
		pages: 1463
	})
	db.book.create({
		title: "It",
		author: "Stephen King",
		genre: ["Horror", "Fantasy", "Fiction"],
		pages: 1116
	})
	db.book.create({
		title: "Air Awakens(Air Awakens #1)",
		author: "Elisa Kova",
		genre: ["Fantasy", "Young Adult", "Magic"],
		pages: 377
	})
	db.book.create({
		title: "Prince of Thorns(The Broken Empire #1)",
		author: "Mark Lawrence",
		genre: ["Fantasy", "Dark Fantasy", "Fiction"],
		pages: 384
	})
	db.book.create({
		title: "To Kill a Mockingbird(To Kill a Mockingbird #1)",
		author: "Harper Lee",
		genre: ["Classics", "Historical Fiction", "Fiction"],
		pages: 324
	})
	db.book.create({
		title: "I Am Number Four(Lorien Legacies #1)",
		author: "Pittacus Lore",
		genre: ["Fantasy", "Young Adult", "Science Fiction"],
		pages: 452
	})
	db.book.create({
		title: "Life of Pi",
		author: "Yann Martel",
		genre: ["Fantasy", "Adventure", "Fiction"],
		pages: 460
	})
	db.book.create({
		title: "The World of Ice & Fire: The Untold History of Westeros and the Game of Thrones(A Song of Ice and Fire)",
		author: "George R.R. Martin",
		genre: ["Fantasy", "Epic Fantasy", "Fiction"],
		pages: 326
	})
	db.book.create({
		title: "Cinder",
		author: "Marissa Meyer",
		genre: ["Fantasy", "Young Adult", "Science Fiction"],
		pages: 395
	})
	db.book.create({
		title: "Gone with the Wind",
		author: "Margaret Mitchell",
		genre: ["Classics", "Historical Fiction", "Fiction"],
		pages: 1037
	})
	db.book.create({
		title: "The Night Circus",
		author: "Erin Morgenstern",
		genre: ["Fantasy", "Romance", "Fiction"],
		pages: 400
	})
	db.book.create({
		title: "Summer, Fireworks, and My Corpse",
		author: "Otsuichi",
		genre: ["Horror", "Asian Literature", "Short Stories"],
		pages: 350
	})
})


module.exports = db

