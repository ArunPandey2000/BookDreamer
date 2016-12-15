//SearchJson Route
const express 	= require( 'express')
const router	= express.Router( )
const fs 		= require('fs')
const request 	= require('request')

router.get('/', (req,res) => {
	res.render('jsonIndex', {message: req.query.message})
})

//Post

function getReviews(isbn) {
	request({
		method: 'Get',
		uri: "https://www.goodreads.com/book/isbn/",
		format: 'json',
		user_id: 5777448,
		isbn: isbn
	})
}

router.post('/', (req, res) => {

	//Put publishing years into an array

	let publishDate = []

	if(req.body.twoTen == "true") {
		publishDate.push(2017, 2010)
	}
	if(req.body.two == "true") {
		publishDate.push(2010, 2000)
	}
	if(req.body.nineFive == "true") {
		publishDate.push(2000, 1950)
	}
	if(req.body.nine == "true") {
		publishDate.push(1950, 1900)
	}
	if(req.body.eigth == "true") {
		publishDate.push(1900, 1800)
	}
	if(req.body.zero == "true") {
		publishDate.push(1800, 0000)
	}

	//Check if filter options are filled in or not

	let author 	 = req.body.author || ""
	let tags 	 = (req.body.genre.length > 0) ? req.body.genre : undefined
	let series 	 = req.body.series || ""
	let language = (req.body.language.length > 0) ? req.body.language : undefined
	let inputText = req.body.inputText
	let splitText = ""

	if (inputText.indexOf(" ")) {
		splitText = inputText.split(" ")
	}

	// The query
	let queryFilter = {}
	if (!(inputText.indexOf(" "))) 	queryFilter.title 		= inputText.toLowerCase()
	if (splitText != "") 			queryFilter.title		= splitText
	if (author) 					queryFilter.authors	 	= author.toLowerCase()
	if (typeof tags === 'string') 	queryFilter.tags 		= tags.toLowerCase()
	if (tags != undefined && tags.constructor == Array) queryFilter.tags = tags
	if (series)						queryFilter.series 		= series
	if (publishDate.length != 0) 	queryFilter.pubdate 	= publishDate
	if (language) 					queryFilter.languages 	= language


	let exists = (data, callback) => {
		let matchCounter = 0
		let keysChecked = 0

		for(let key in queryFilter) {
			keysChecked ++
			if( queryFilter[key].constructor == Array ) {
				//Problem adds result of if and else together instead of filtering
				if( queryFilter[key][0] >= 1) {
					if( (data[key].slice(0, 4) >= queryFilter[key].slice(-1)[0]) && (data[key].slice(0, 4) <= queryFilter[key][0]) ) {
						matchCounter ++
					}
				}
				else {
					for( let i = 0; i < queryFilter[key].length; i++ ) {
						if( !(data[key].toLowerCase().indexOf(queryFilter[key][i].toLowerCase()) == -1) ) {
							matchCounter ++
						}
					}
				}			
			}
			else {
				if( !(data[key].toLowerCase().indexOf(queryFilter[key]) == -1) ) {
					matchCounter ++
				}
			}
			// console.log(data[key] + ' with ' + queryFilter[ key ])
			// console.log('Matched ' + matchCounter + ' out of ' + keysChecked)
		}

		if (matchCounter == keysChecked) {
			callback(data)
		} else {
			callback()
		}
		
	}

	console.log('Loading file')
	fs.readFile(__dirname + "/../books.json", 'utf-8', (err, data) => {
		if(err) throw err
		console.log('Loaded file complete')
		let results = []
		let jsonData = JSON.parse(data)
		console.log('Loaded ' + jsonData.length + ' books')
		// console.log('Query data:')
		// console.log(queryFilter)

		// Check for authors
		for(let i = 0; i < jsonData.length; i++) {

			// Break for loop if author is not found
			exists(jsonData[i], function(match) {
				if (match) results.push(match)
			})
		} 
		console.log(results)
		if(!(results.length == 0)) {
			res.render("jsonResult", {book: results})
		}
		else {
			res.redirect('/?message=' + encodeURIComponent("No results found, try again with less filter options, or don't fill in anything to get the whole list!"))
		} 
		// for(let j = 0; j < results.length; i++) {
		// 	getReviews(results[i].isbn)
		// }
	})
})

module.exports = router