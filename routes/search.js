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
	let publish = []
	let inputText = req.body.inputText.toUpperCase()

	//Put publishing years into an array
	if(req.body.twoTen == "true") {
		publish.push(2010)
	}
	if(req.body.two == "true") {
		publish.push(2000)
	}
	if(req.body.nineFive == "true") {
		publish.push(1950)
	}
	if(req.body.nine == "true") {
		publish.push(1900)
	}
	if(req.body.eigth == "true") {
		publish.push(1800)
	}


	//Change value genre and language to undefined when not specified
	if(req.body.genre == 0) {
		req.body.genre = undefined
	}

	if(req.body.language == 0) {
		req.body.language = undefined
	}
	
	//Give series properties true/false
	if(req.body.series == undefined) {
		req.body.series = false
	}
	else {
		req.body.series = true
	}

	//Object for filter options
	let filter = {
	}

	//Check if filter options are filled in or not

	if (req.body.language) filter.language = req.body.language
	if (req.body.author) filter.author = {$iLike: '%' + req.body.author + '%'}
	if (req.body.genre) filter.genre = {$contains: [req.body.genre]}
	if (req.body.pagesMax && req.body.pagesMin) filter.pages = {$between: [req.body.pagesMin, req.body.pagesMax]}
	if (req.body.pagesMax && req.body.pagesMin == "") filter.pages = {$between: [0, req.body.pagesMax]}
	if (req.body.series) filter.series = req.body.series
	if (publish.length != 0) filter.published = {$between: [publish.slice(-1)[0], new Date().getFullYear()]}
	if (req.body.rating) filter.rating = {$between: [req.body.rating, 5]}

	db.book.findAll({
		where: filter	
	}).then(books=>{
		let result = []
		for(let i = 0; i < books.length; i++){
			if(books[i].title.toUpperCase().match(inputText) || books[i].summary.toUpperCase().match(inputText)) {
				result.push({
					id: books[i].id,
					title: books[i].title,
					author: books[i].author,
					genre: books[i].genre,
					pages: books[i].pages,
					linkid: books[i].linkid,
					series: books[i].series,
					published: books[i].published,
					language: books[i].language,
					rating: books[i].rating,
					summary: books[i].summary
				})
			}
		}
		if(result.length != 0) {
			res.render('result', {book: result})
		}
		else {
			res.render('result', {book: books})
		}
	})
})

module.exports = router