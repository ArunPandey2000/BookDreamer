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
	// if (req.body.inputText) filter.title = req.body.inputText
	if (req.body.language) filter.language = req.body.language
	if (req.body.author) filter.author = req.body.author
	if (req.body.genre) filter.genre = {$contains: [req.body.genre]}
	if (req.body.pagesMax && req.body.pagesMin) filter.pages = {$between: [req.body.pagesMin, req.body.pagesMax]}
	if (req.body.pagesMax && req.body.pagesMin == "") filter.pages = {$between: [0, req.body.pagesMax]}
	if (req.body.series) filter.series = req.body.series
	if (publish.length != 0) filter.published = {$between: [publish.slice(-1)[0], new Date().getFullYear()]}
	if (req.body.rating) filter.rating = {$between: [req.body.rating, 5]}

	db.book.findAll({
		where: filter			
	}).then(books=>{
		res.render('result', {book: books})
	})
})

module.exports = router