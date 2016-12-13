//SearchJson Route
const express 	= require( 'express')
const router	= express.Router( )
const fs 		= require('fs')

//Read Json Database
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

	let compareAuthor 	= new RegExp(author, "i")
	let compareTags 	= new RegExp(tags, "i")

	// Add rating later?

	fs.readFile(__dirname + "/../books.json", 'utf-8', (err, data) => {
		if(err) {
			throw err
		}
		let result = []
		let jsonData = JSON.parse(data)
		for(let i = 0; i < jsonData.length; i++) {
			if(publishDate.length != 0) {
				//Series is true + publishDate
				if(series) {
					//Series + language + publishDate
					if(language != 0){
						//Series + language + author + publishDate
						if(author) {
							//Series + language + author + tags(genre) + publishDate
							if(tags != 0) {
								if((jsonData[i].languages == language) && (jsonData[i].series) && (jsonData[i].authors.match(compareAuthor)) && (jsonData[i].tags.match(compareTags)) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
									console.log("All options filled in!")
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
							//Series + language + author + publishDate, but no tags 
							else {
								if((jsonData[i].languages == language) && (jsonData[i].series) && (jsonData[i].authors.match(compareAuthor)) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
									console.log("No tags")
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
						//Series + language + publishDate, no author
						else {
							//Series + language + tags + publishDate, no author
							if(tags != 0) {
								if((jsonData[i].languages == language) && (jsonData[i].series) && (jsonData[i].tags.match(compareTags)) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
									console.log("No author")
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
							//Series + language + publishDate, no author and no tags
							else {
								console.log("No author and no tags")
								if((jsonData[i].languages == language) && (jsonData[i].series) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
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
					//Series + publishDate, no language
					else {
						//Series + author + publishDate, no language
						if(author) {
							//Series + author + tags + publishDate, no language
							if(tags != 0) {
								if((jsonData[i].series) && (jsonData[i].authors.match(compareAuthor)) && (jsonData[i].tags.match(compareTags)) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
									console.log("No language")
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
							//Series + author + publishDate, no language and no tags
							else {
								if((jsonData[i].series) && (jsonData[i].authors.match(compareAuthor)) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
									console.log("No language and no tags")
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
						//Series + publishDate, no language and no author
						else {
							//Series + tags + publishDate, no language and no author
							if(tags != 0) {
								if((jsonData[i].series) && (jsonData[i].tags.match(compareTags)) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
									console.log("No language and no author")
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
							//Series + publishDate, no language, no tags and no author
							else {
								if((jsonData[i].series) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
									console.log("No language, no tags and no author")
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
				//PublishDate, No series
				else{
					//Language + publishDate, no series
					if(language != 0) {
						//Language + author + publishDate, no series
						if(author) {
							//Language + author + tags + publishDate, no series
							if(tags != 0) {
								if((jsonData[i].languages == language) && (jsonData[i].authors.match(compareAuthor)) && (jsonData[i].tags.match(compareTags)) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
									console.log("No series")
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
							//Language + author + publishDate, no series and no tags
							else {
								if((jsonData[i].languages == language) && (jsonData[i].authors.match(compareAuthor)) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
									console.log("No series and no tags")
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
						//Language + publishDate, no series and no author
						else {
							//Language + tags + publishDate, no series and no author
							if(tags != 0) {
								if((jsonData[i].languages == language) && (jsonData[i].tags.match(compareTags)) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
									console.log("No series and no author")
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
							//Language + publishDate, no series, no author and no tags
							else {
								if((jsonData[i].languages == language) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
									console.log("No series, no author and no tags")
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
					//PublishDate, no language and no series
					else {
						//Author + publishDate, no language
						if(author) {
							//Author + tags + publishDate, no language, no series
							if(tags != 0) {
								if((jsonData[i].authors.match(compareAuthor)) && (jsonData[i].tags.match(compareTags)) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
									console.log("No language and no series")
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
							//Author + publishDate, no language, no series and no tags
							else {
								if(jsonData[i].authors.match(compareAuthor) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
									console.log("No language, no series and no tags")
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
						//PublishDate, no author, no language, no series
						else {
							//Tags + publishDate, no author, no language and no series
							if(tags != 0) {
								if(jsonData[i].tags.match(compareTags) && (publishDate.slice(-1)[0] <= jsonData[i].pubdate.slice(0,4))) {
									console.log("No author, no language and no series")
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
									console.log("Only publishDate")
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
			//No publishDate
			else {
				if(series) {
					//Series + language, no publishDate
					if(language != 0){
						//Series + language + author, no publishDate
						if(author) {
							//Series + language + author + tags(genre), no publishDate
							if(tags != 0) {
								if((jsonData[i].languages == language) && (jsonData[i].series) && (jsonData[i].authors.match(compareAuthor)) && (jsonData[i].tags.match(compareTags))) {
									console.log("All options filled in!")
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
							//Series + language + author, but no publishDate and no tags 
							else {
								if((jsonData[i].languages == language) && (jsonData[i].series) && (jsonData[i].authors.match(compareAuthor))) {
									console.log("No tags")
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
						//Series + language, no author, no publishDate
						else {
							//Series + language + tags, no author, no publishDate
							if(tags != 0) {
								if((jsonData[i].languages == language) && (jsonData[i].series) && (jsonData[i].tags.match(compareTags))) {
									console.log("No author")
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
							//Series + language, no author, no publishDate and no tags
							else {
								console.log("No author and no tags")
								if((jsonData[i].languages == language) && (jsonData[i].series)) {
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
					//Series, no language, no publishDate
					else {
						//Series + author, no language, no publishDate
						if(author) {
							//Series + author + tags, no language, no publishDate
							if(tags != 0) {
								if((jsonData[i].series) && (jsonData[i].authors.match(compareAuthor)) && (jsonData[i].tags.match(compareTags))) {
									console.log("No language")
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
							//Series + author, no language, no publishDate and no tags
							else {
								if((jsonData[i].series) && (jsonData[i].authors.match(compareAuthor))) {
									console.log("No language and no tags")
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
						//Series, no language, no publishDate and no author
						else {
							//Series + tags, no language, no publishDate and no author
							if(tags != 0) {
								if((jsonData[i].series) && (jsonData[i].tags.match(compareTags))) {
									console.log("No language and no author")
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
							//Series, no language, no tags, no publishDate and no author
							else {
								if(jsonData[i].series) {
									console.log("No language, no tags and no author")
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
				//No series, no publishDate
				else{
					//Language, no series, no publishDate
					if(language != 0) {
						//Language + author, no series, no publishDate
						if(author) {
							//Language + author + tags, no series, no publishDate
							if(tags != 0) {
								if((jsonData[i].languages == language) && (jsonData[i].authors.match(compareAuthor)) && (jsonData[i].tags.match(compareTags))) {
									console.log("No series")
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
							//Language + author, no series, no publishDate and no tags
							else {
								if((jsonData[i].languages == language) && (jsonData[i].authors.match(compareAuthor))) {
									console.log("No series and no tags")
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
						//Language, no series, no publishDate and no author
						else {
							//Language + tags, no series, no publishDate and no author
							if(tags != 0) {
								if((jsonData[i].languages == language) && (jsonData[i].tags.match(compareTags))) {
									console.log("No series and no author")
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
							//Language, no series, no author, no publishDate and no tags
							else {
								if(jsonData[i].languages == language) {
									console.log("No series, no author and no tags")
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
					//No language, no publishDate and no series
					else {
						//Author, no language, no publishDate and no series
						if(author) {
							//Author + tags, no language, no series, no publishDate
							if(tags != 0) {
								if((jsonData[i].authors.match(compareAuthor)) && (jsonData[i].tags.match(compareTags))) {
									console.log("No language and no series")
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
							//Author, no language, no series, no publishDate and no tags
							else {
								if(jsonData[i].authors.match(compareAuthor)) {
									console.log("No language, no series and no tags")
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
						//PublishDate, no author, no language, no series
						else {
							//Tags, no author, no language, no publishDate and no series
							if(tags != 0) {
								if(jsonData[i].tags.match(compareTags)) {
									console.log("No author, no language and no series")
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
								console.log("Nothing filled in!")
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
		console.log(result)
		res.render('jsonResult', {book: result})
	})
})

module.exports = router