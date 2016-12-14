//SearchJson Route
const express 	= require( 'express')
const router	= express.Router( )
const fs 		= require('fs')
const request 	= require('request')

router.get('/', (req,res) => {
	res.render('jsonIndex')
})

//Post

router.post('/', (req, res) => {

	//Put publishing years into an array

	let publishDate = []

	if(req.body.twoTen == "true") {
		publishDate.push(2010)
	}
	if(req.body.two == "true") {
		publishDate.push(2000)
	}
	if(req.body.nineFive == "true") {
		publishDate.push(1950)
	}
	if(req.body.nine == "true") {
		publishDate.push(1900)
	}
	if(req.body.eigth == "true") {
		publishDate.push(1800)
	}

	//Check if filter options are filled in or not

	let author 	 = req.body.author || ""
	let tags 	 = req.body.genre
	let series 	 = req.body.series || ""
	let language = req.body.language
	let inputText = req.body.inputText
	// let splitText = inputText.split(" ")

	// The query
	let queryFilter = {}
	if (inputText) queryFilter.title 	= inputText.toLowerCase()
	if (author) queryFilter.authors	 	= author.toLowerCase()
	if (tags)	queryFilter.tags 	 	= tags
	if (series)	queryFilter.series 		= series
	if (publishDate.length != 0) queryFilter.pubdate = publishDate
	if (language) queryFilter.languages = language

	let exists = (data, filter, callback) => {
		console.log('exists actually triggers')

		if (queryFilter[filter]) {

			// console.log(queryFilter[filter] + ' ' + filter +   ' query data came through')
			// console.log('Checking ' + queryFilter[filter] + ' against ' + data[filter] )
			// console.log('Result: ' + data[filter].indexOf(queryFilter[filter]) )

			if( !(data[filter].toLowerCase().indexOf(queryFilter[filter]) == -1) ) {
				// console.log(filter + ' match')
				callback(data)
			}

		}
		// console.log( 'No match for ' + queryFilter[filter] + ' against ' + data[filter] )
		callback()
	}

	console.log('Loading file')
	fs.readFile(__dirname + "/../books.json", 'utf-8', (err, data) => {
		if(err) throw err
		console.log('Loaded file complete')
		let results = []
		let jsonData = JSON.parse(data)
		console.log('Loaded ' + jsonData.length + ' books')

		// Check for authors
		for(let i = 0; i < jsonData.length; i++) {
			console.log('Json loop ' + i)

			// Break for loop if author is not found
			console.log('Checking for author')
			exists(jsonData[i], 'authors', function(match) {
				if (match) results.push(match)
			})
		}
		console.log(results)
	})

})

module.exports = router