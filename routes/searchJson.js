//SearchJson Route
const express 	= require( 'express')
const router	= express.Router( )
const fs 		= require('fs')
const request 	= require('request')

//Read Json Database

// function(isbn)

// 	request({
// 		method: 'Get'
// 		uri: "https://www.goodreads.com/book/isbn_to_id/",
// 		key: ,
// 		isbn: 
// 	})
	

//Get

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
	let tags 	 = req.body.genre //0
	let series 	 = req.body.series || ""
	let language = req.body.language //0
	let inputText = req.body.inputText
	let splitText = inputText.split(" ")

	// The query
	// let queryFiler = {}
	// if (author) query.author = author

	// source.indexOf('query')

	let compareTags 	= new RegExp(tags, "i")
	// let compareTags		= ""
	let compareAuthor 	= ""
	let compareTitle 	= ""

	if(author) {
		compareAuthor = String(new RegExp(author, "i"))
	}

	// if(tags) {
	// 	if(typeof tags == "string") {
	// 		console.log('tags is string')
	// 		compareTags	= new RegExp(tags , "i")
	// 	}
	// 	else {
	// 		console.log('tags is OTHER')
	// 		compareTags = new RegExp(tags.join(" | "), "i")
	// 	}
	// }

	if(inputText) {
		if(splitText.length == 1) {
			compareTitle = String(new RegExp(splitText, "i"))
		}
		else {
			compareTitle = String(new RegExp(splitText.join(" | "), "i"))
		}
	}

	// Add rating later?

	fs.readFile(__dirname + "/../books.json", 'utf-8', (err, data) => {
		if(err) {
			throw err
		}
		let result = []
		let jsonData = JSON.parse(data)
		for(let i = 0; i < jsonData.length; i++) {
			// console.log(typeof jsonData[2].tags) 
			// console.log(jsonData[2].tags.match(compareTags))

			//Inputfield filled in
			if(inputText) {
				if(publishDate.length != 0) {
					//Series is true + publishDate + input
					if(series == false) {
						//Series + language + publishDate + input
						if(language != 0){
							//Series + language + author + publishDate + input
							if(author) {
								//Series + language + author + tags(genre) + publishDate + input
								if(tags != 0) {
									if((jsonData[i].languages == language) && (jsonData[i].series == "") && (jsonData[i].authors.match(compareAuthor)) && (jsonData[i].tags.match(compareTags)) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
								//Series + language + author + publishDate + input, but no tags 
								else {
									if((jsonData[i].languages == language) && (jsonData[i].series == "") && (jsonData[i].authors.match(compareAuthor)) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
							}
							//Series + language + publishDate + input, no author
							else {
								//Series + language + tags + publishDate + input, no author
								if(tags != 0) {
									if((jsonData[i].languages == language) && (jsonData[i].series == "") && (jsonData[i].tags.match(compareTags)) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
								//Series + language + publishDate + input, no author and no tags
								else {
									if((jsonData[i].languages == language) && (jsonData[i].series == "") && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
							}
						}
						//Series + publishDate + input, no language
						else {
							//Series + author + publishDate + input, no language
							if(author) {
								//Series + author + tags + publishDate + input, no language
								if(tags != 0) {
									if((jsonData[i].series == "") && (jsonData[i].authors.match(compareAuthor)) && (jsonData[i].tags.match(compareTags)) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
								//Series + author + publishDate + input, no language and no tags
								else {
									if((jsonData[i].series == "") && (jsonData[i].authors.match(compareAuthor)) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
							}
							//Series + publishDate + input, no language and no author
							else {
								//Series + tags + publishDate + input, no language and no author
								if(tags != 0) {
									if((jsonData[i].series == "") && (jsonData[i].tags.match(compareTags)) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
								//Series + publishDate + input, no language, no tags and no author
								else {
									if((jsonData[i].series == "") && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
							}
						}
					}
					//PublishDate + input, No series
					else{
						//Language + publishDate + input, no series
						if(language != 0) {
							//Language + author + publishDate + input, no series
							if(author) {
								//Language + author + tags + publishDate + input, no series
								if(tags != 0) {
									if((jsonData[i].languages == language) && (jsonData[i].authors.match(compareAuthor)) && (jsonData[i].tags.match(compareTags)) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
								//Language + author + publishDate + input, no series and no tags
								else {
									if((jsonData[i].languages == language) && (jsonData[i].authors.match(compareAuthor)) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
							}
							//Language + publishDate + input, no series and no author
							else {
								//Language + tags + publishDate + input, no series and no author
								if(tags != 0) {
									if((jsonData[i].languages == language) && (jsonData[i].tags.match(compareTags)) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
								//Language + publishDate + input, no series, no author and no tags
								else {
									if((jsonData[i].languages == language) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
							}
						}
						//PublishDate + input, no language and no series
						else {
							//Author + publishDate + input, no language
							if(author) {
								//Author + tags + publishDate + input, no language, no series
								if(tags != 0) {
									if((jsonData[i].authors.match(compareAuthor)) && (jsonData[i].tags.match(compareTags)) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
								//Author + publishDate + input, no language, no series and no tags
								else {
									if(jsonData[i].authors.match(compareAuthor) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
							}
							//PublishDate + input, no author, no language, no series
							else {
								//Tags + publishDate + input, no author, no language and no series
								if(tags != 0) {
									if(jsonData[i].tags.match(compareTags) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
								//PublishDate + input
								else {
									if((publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
							}
							
						}
					}
				}
				//Input, no publishDate
				else {
					if(series == false) {
						//Series + language + input, no publishDate
						if(language != 0){
							//Series + language + author + input, no publishDate
							if(author) {
								//Series + language + author + tags(genre) + input, no publishDate
								if(tags != 0) {
									if((jsonData[i].languages == language) && (jsonData[i].series == "") && (jsonData[i].authors.match(compareAuthor)) && (jsonData[i].tags.match(compareTags))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
								//Series + language + author + input, but no publishDate and no tags 
								else {
									if((jsonData[i].languages == language) && (jsonData[i].series == "") && (jsonData[i].authors.match(compareAuthor))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
							}
							//Series + language + input, no author, no publishDate
							else {
								//Series + language + tags + input, no author, no publishDate
								if(tags != 0) {
									if((jsonData[i].languages == language) && (jsonData[i].series == "") && (jsonData[i].tags.match(compareTags))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
								//Series + language + input, no author, no publishDate and no tags
								else {
									if((jsonData[i].languages == language) && (jsonData[i].series == "")) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
							}
						}
						//Series + input, no language, no publishDate
						else {
							//Series + author + input, no language, no publishDate
							if(author) {
								//Series + author + tags + input, no language, no publishDate
								if(tags != 0) {
									if((jsonData[i].series == "") && (jsonData[i].authors.match(compareAuthor)) && (jsonData[i].tags.match(compareTags))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
								//Series + author + input, no language, no publishDate and no tags
								else {
									if((jsonData[i].series == "") && (jsonData[i].authors.match(compareAuthor))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
							}
							//Series + input, no language, no publishDate and no author
							else {
								//Series + tags + input, no language, no publishDate and no author
								if(tags != 0) {
									if((jsonData[i].series == "") && (jsonData[i].tags.match(compareTags))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
								//Series + input, no language, no tags, no publishDate and no author
								else {
									if((jsonData[i].series == "")) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
							}
						}
					}
					//Input, no series, no publishDate
					else{
						//Language + input, no series, no publishDate
						if(language != 0) {
							//Language + author + input, no series, no publishDate
							if(author) {
								//Language + author + tags + input, no series, no publishDate
								if(tags != 0) {
									if((jsonData[i].languages == language) && (jsonData[i].authors.match(compareAuthor)) && (jsonData[i].tags.match(compareTags))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
								//Language + author + input, no series, no publishDate and no tags
								else {
									if((jsonData[i].languages == language) && (jsonData[i].authors.match(compareAuthor))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
							}
							//Language + input, no series, no publishDate and no author
							else {
								//Language + tags + input, no series, no publishDate and no author
								if(tags != 0) {
									if((jsonData[i].languages == language) && (jsonData[i].tags.match(compareTags))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
								//Language + input, no series, no author, no publishDate and no tags
								else {
									if((jsonData[i].languages == language)) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
							}
						}
						//Input, no language, no publishDate and no series
						else {
							//Author + input, no language, no publishDate and no series
							if(author) {
								//Author + tags + input, no language, no series, no publishDate
								if(tags != 0) {
									if((jsonData[i].authors.match(compareAuthor)) && (jsonData[i].tags.match(compareTags))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
								//Author + input, no language, no series, no publishDate and no tags
								else {
									if((jsonData[i].authors.match(compareAuthor))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
							}
							//PublishDate + input, no author, no language, no series
							else {
								//Tags + input, no author, no language, no publishDate and no series
								if(tags != 0) {
									if((jsonData[i].tags.match(compareTags))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
								//Only Input
								else {
									if(((jsonData[i].title.match(compareTitle)) || (jsonData[i].authors.match(compareTitle)) || (jsonData[i].tags.match(compareTitle)))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
							}
						}
					}
				}
			}
			//No input(text)
			else {
				if(publishDate.length != 0) {
					//Series is true + publishDate, no input(text)
					if(series == false) {
						//Series + language + publishDate, no input(text)
						if(language != 0){
							//Series + language + author + publishDate, no input(text)
							if(author) {
								//Series + language + author + tags(genre) + publishDate, no input(text)
								if(tags != 0) {
									if((jsonData[i].languages == language) && (jsonData[i].series == "") && (jsonData[i].authors.match(compareAuthor)) && (jsonData[i].tags.match(compareTags)) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
								//Series + language + author + publishDate, no input(text), no tags 
								else {
									if((jsonData[i].languages == language) && (jsonData[i].series == "") && (jsonData[i].authors.match(compareAuthor)) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
							}
							//Series + language + publishDate, no author, no input(text)
							else {
								//Series + language + tags + publishDate, no author, no input(text)
								if(tags != 0) {
									if((jsonData[i].languages == language) && (jsonData[i].series == "") && (jsonData[i].tags.match(compareTags)) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
								//Series + language + publishDate, no author, no input(text) and no tags
								else {
									if((jsonData[i].languages == language) && (jsonData[i].series == "") && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
							}
						}
						//Series + publishDate, no language, no input(text)
						else {
							//Series + author + publishDate, no language, no input(text)
							if(author) {
								//Series + author + tags + publishDate, no language, no input(text)
								if(tags != 0) {
									if((jsonData[i].series == "") && (jsonData[i].authors.match(compareAuthor)) && (jsonData[i].tags.match(compareTags)) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
								//Series + author + publishDate, no language, no input(text) and no tags
								else {
									if((jsonData[i].series == "") && (jsonData[i].authors.match(compareAuthor)) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
							}
							//Series + publishDate, no language, no input(text) and no author
							else {
								//Series + tags + publishDate, no language, no input(text) and no author
								if(tags != 0) {
									if((jsonData[i].series == "") && (jsonData[i].tags.match(compareTags)) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
								//Series + publishDate, no language, no tags, no input(text) and no author
								else {
									if((jsonData[i].series == "") && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
							}
						}
					}
					//PublishDate, No series, no input(text)
					else{
						//Language + publishDate, no series, no input(text)
						if(language != 0) {
							//Language + author + publishDate, no series, no input(text)
							if(author) {
								//Language + author + tags + publishDate, no series, no input(text)
								if(tags != 0) {
									if((jsonData[i].languages == language) && (jsonData[i].authors.match(compareAuthor)) && (jsonData[i].tags.match(compareTags)) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
								//Language + author + publishDate, no series, no input(text) and no tags
								else {
									if((jsonData[i].languages == language) && (jsonData[i].authors.match(compareAuthor)) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
							}
							//Language + publishDate, no series, no input(text) and no author
							else {
								//Language + tags + publishDate, no series, no input(text) and no author
								if(tags != 0) {
									if((jsonData[i].languages == language) && (jsonData[i].tags.match(compareTags)) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
								//Language + publishDate, no series, no author, no input(text) and no tags
								else {
									if((jsonData[i].languages == language) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
							}
						}
						//PublishDate, no language, no input(text) and no series
						else {
							//Author + publishDate, no language, no input(text)
							if(author) {
								//Author + tags + publishDate, no language, no series, no input(text)
								if(tags != 0) {
									if((jsonData[i].authors.match(compareAuthor)) && (jsonData[i].tags.match(compareTags)) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
								//Author + publishDate, no language, no series, no input(text) and no tags
								else {
									if(jsonData[i].authors.match(compareAuthor) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
							}
							//PublishDate, no author, no language, no series, no input(text)
							else {
								//Tags + publishDate, no author, no language, no input(text) and no series
								if(tags != 0) {
									if(jsonData[i].tags.match(compareTags) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
								//Only PublishDate
								else {
									if(publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4)) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
							}
							
						}
					}
				}
				//No publishDate, no input(text)
				else {
					if(series == false) {
						//Series + language, no publishDate, no input(text)
						if(language != 0){
							//Series + language + author, no publishDate, no input(text)
							if(author) {
								//Series + language + author + tags(genre), no publishDate, no input(text)
								if(tags != 0) {
									if((jsonData[i].languages == language) && (jsonData[i].series == "") && (jsonData[i].authors.match(compareAuthor)) && (jsonData[i].tags.match(compareTags))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
								//Series + language + author, but no publishDate, no input(text) and no tags 
								else {
									if((jsonData[i].languages == language) && (jsonData[i].series == "") && (jsonData[i].authors.match(compareAuthor))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
							}
							//Series + language, no author, no publishDate, no input(text)
							else {
								//Series + language + tags, no author, no publishDate, no input(text)
								if(tags != 0) {
									if((jsonData[i].languages == language) && (jsonData[i].series == "") && (jsonData[i].tags.match(compareTags))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
								//Series + language, no author, no publishDate, no input(text) and no tags
								else {
									if((jsonData[i].languages == language) && (jsonData[i].series == "")) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
							}
						}
						//Series, no language, no publishDate, no input(text)
						else {
							//Series + author, no language, no publishDate, no input(text)
							if(author) {
								//Series + author + tags, no language, no publishDate, no input(text)
								if(tags != 0) {
									if((jsonData[i].series == "") && (jsonData[i].authors.match(compareAuthor)) && (jsonData[i].tags.match(compareTags))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
								//Series + author, no language, no publishDate, no input(text) and no tags
								else {
									if((jsonData[i].series == "") && (jsonData[i].authors.match(compareAuthor))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
							}
							//Series, no language, no publishDate, no input(text) and no author
							else {
								//Series + tags, no language, no publishDate, no input(text) and no author
								if(tags != 0) {
									if((jsonData[i].series == "") && (jsonData[i].tags.match(compareTags))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
								//Series, no language, no tags, no publishDate, no input(text) and no author
								else {
									if(jsonData[i].series == "") {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
							}
						}
					}
					//No series, no publishDate, no input(text)
					else{
						//Language, no series, no publishDate, no input(text)
						if(language != 0) {
							//Language + author, no series, no publishDate, no input(text)
							if(author) {
								//Language + author + tags, no series, no publishDate, no input(text)
								if(tags != 0) {
									if((jsonData[i].languages == language) && (jsonData[i].authors.match(compareAuthor)) && (jsonData[i].tags.match(compareTags))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
								//Language + author, no series, no publishDate, no input(text) and no tags
								else {
									if((jsonData[i].languages == language) && (jsonData[i].authors.match(compareAuthor))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
							}
							//Language, no series, no publishDate, no input(text) and no author
							else {
								//Language + tags, no series, no publishDate, no input(text) and no author
								if(tags != 0) {
									if((jsonData[i].languages == language) && (jsonData[i].tags.match(compareTags))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
								//Language, no series, no author, no publishDate, no input(text) and no tags
								else {
									if(jsonData[i].languages == language) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
							}
						}
						//No language, no publishDate, no input(text) and no series
						else {
							//Author, no language, no publishDate, no input(text) and no series
							if(author) {
								//Author + tags, no language, no series, no publishDate, no input(text)
								if(tags != 0) {
									if((jsonData[i].authors.match(compareAuthor)) && (jsonData[i].tags.match(compareTags))) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
								//Author, no language, no series, no publishDate, no input(text) and no tags
								else {
									if(jsonData[i].authors.match(compareAuthor)) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
							}
							//PublishDate, no author, no language, no series, no input(text)
							else {
								//Tags, no author, no language, no publishDate, no input(text) and no series
								if(tags != 0) {
									if(jsonData[i].tags.match(compareTags)) {
										result.push({
											title: jsonData[i].title,
											author: jsonData[i].authors,
											genre: jsonData[i].tags,
											language: jsonData[i].languages,
											rating: jsonData[i].rating,
											pubdate: jsonData[i].pubdate.slice(0,4),
											isbn: jsonData[i].isbn,
											series: jsonData[i].series
										})
									}
								}
								//Nothing filled in
								else {
									result.push({
										title: jsonData[i].title,
										author: jsonData[i].authors,
										genre: jsonData[i].tags,
										language: jsonData[i].languages,
										rating: jsonData[i].rating,
										pubdate: jsonData[i].pubdate.slice(0,4),
										isbn: jsonData[i].isbn,
										series: jsonData[i].series
									})
								}
							}
							
						}
					}
				}
			}
		}
		console.log(result)
		res.render('jsonResult', {book: result})
	})
})

module.exports = router