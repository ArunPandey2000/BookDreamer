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
	let pagesMax = req.body.pagesMax

	if(author != "") {
		db.book.findAll({
			where: {
				author: author
			}
		}).then(book => {
			let result = []
			let newResult = []
			for(let i = 0; i < book.length; i++) {
				for(let j = 0; j < book[i].genre.length; j++) {
					if(pagesMax >= book[i].pages && genre == book[i].genre[j]) {
						result.push({
							title: book[i].title,
							author: book[i].author,
							genre: book[i].genre,
							pages: book[i].pages,
							linkid: book[i].linkid
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
				res.send("No Pages! No genre!")
			}
		})
	}
	else {
		db.book.findAll().then(book => {
			let result = []
			for(let i = 0; i < book.length; i++) {
				for(let j = 0; j < book[i].genre.length; j++) {
					if(pagesMax >= book[i].pages && genre == book[i].genre[j]) {
						result.push({
							title: book[i].title,
							author: book[i].author,
							genre: book[i].genre,
							pages: book[i].pages,
							linkid: book[i].linkid
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
				res.send("No Pages! No genre!")
			}
		})
	}
})

module.exports = router