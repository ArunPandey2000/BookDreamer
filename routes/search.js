//Search Route

const express 	= require( 'express')
const router	= express.Router( )
const db		= require(__dirname + '/database')

//Get

router.get('/', (req, res) => {
	res.render('index')
})

//Post

router.post('/', (req, res) => {
	// let inputText = req.body.inputText
	let author = req.body.author
	let genre = req.body.genre
	let pages = req.body.pages

	if(author != "") {
		db.book.findAll({
			where: {
				author: author
			}
		}).then(book => {
			let result = []
			for(let i = 0; i < book.length; i++) {
				if(pages != ""){
					if(pages >= book[i].pages) {
						result.push({
							title: book[i].title,
							author: book[i].author,
							genre: book[i].genre,
							pages: book[i].pages
						})
					}
				}
			}
			return result
		}).then(book => {
			if(book != ""){
				res.render('result', {book: book})
			}
			else {
				res.send("No Pages!")
			}
		})
	}
	else {
		db.book.findAll().then(book => {
			let result = []
			for(let i = 0; i < book.length; i++) {
				if(pages >= book[i].pages) {
					result.push({
						title: book[i].title,
						author: book[i].author,
						genre: book[i].genre,
						pages: book[i].pages
					}) //Working on this part! 5-12
				}
			}
			return result
		}).then(book => {
			res.render('result', {book: book})
		})
	}
	
	// res.send('Jeeh post is working!')
})

module.exports = router