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
	if (!(inputText.indexOf(" "))) 	queryFilter.title 		= inputText.toLowerCase() //Multiple words is a problem!!
	if (splitText != "") 			queryFilter.title		= splitText
	if (author) 					queryFilter.authors	 	= author.toLowerCase()
	if (typeof tags === 'string') 	queryFilter.tags 		= tags.toLowerCase()
	if (tags != undefined && tags.constructor == Array) queryFilter.tags = tags
	if (series)						queryFilter.series 		= series //Is a problem!
	if (publishDate.length != 0) 	queryFilter.pubdate 	= publishDate //Is a problem!!
	if (language) 					queryFilter.languages 	= language

	console.log(queryFilter)

	let exists = (data, callback) => {
		let matchCounter = 0
		let keysChecked = 0

		for(let key in queryFilter) {
			keysChecked ++
			if( !(queryFilter[key].indexOf(", ") == -1)) {
				//Not working yet, is searching but not comparing right
				if( new RegExp(queryFilter[key].join("|"), "i").test(data[key])) {
					console.log("Array")
					matchCounter ++
				}
			}
			else {
				if( !(data[key].toLowerCase().indexOf(queryFilter[key]) == -1) ) {
					matchCounter ++
					console.log("This is a String")
				}
			}
			console.log(data[key] + ' with ' + queryFilter[ key ])
			console.log('Matched ' + matchCounter + ' out of ' + keysChecked)
		}

		if (matchCounter == keysChecked) {
			callback(data)
		} else {
			callback()
		}
		
	}

	// if( new RegExp(queryFilter[key].join("|")).test(data[key]) ) {
	// 			console.log("Array")
	// 			matchCounter ++
	// 		}

	console.log('Loading file')
	fs.readFile(__dirname + "/../books.json", 'utf-8', (err, data) => {
		if(err) throw err
		// console.log('Loaded file complete')
		let results = []
		let jsonData = JSON.parse(data)
		// console.log('Loaded ' + jsonData.length + ' books')
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
	})
}) 

module.exports = router