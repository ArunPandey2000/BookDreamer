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

	if(req.body.series == 0) {
		req.body.series = undefined
	}

	if(req.body.language == 0) {
		req.body.language = undefined
	}

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

	//Give series properties true/false
	if(req.body.series == undefined) {
		req.body.series = false
	}
	else {
		req.body.series = true
	}

	//Filter options
	// let filter = {
	// 	title: req.body.inputText || undefined,
	// 	author: req.body.author || undefined,
	// 	genre: {
	// 		$contains: [req.body.genre || undefined]
	// 	},
	// 	pages: {
	// 		$between: [(req.body.pagesMin, req.body.pagesMax) || undefined]
	// 	},
	// 	series: req.body.series,
	// 	published: {
	// 		$between: [(publish.slice(-1)[0], new Date().getFullYear()) || (0, new Date().getFullYear())]
	// 	},
	// 	language: req.body.language || undefined
	// }

	let filter = {
		title: req.body.inputText || '*',
		author: req.body.author || '*',
		genre: req.body.genre || '*',
		pagesMin: req.body.pagesMin || 0,
		pagesMax: req.body.pagesMax || 99999999999,
		series: req.body.series,
		published: publish.slice(-1)[0] || 1800,
		language: req.body.language || '*'
	}

	console.log(filter)

	// db.book.findAll({
	// 	where: {
	// 		filter
	// 	}
	// }).then(book => {
	// 	console.log(book)
	// })

	db.book.findAll({
		where: {
			// author: filter.author,
			// genre: {
			// 	$contains: [filter.genre]
			// },
			pages: {
				$between: [filter.pagesMin, filter.pagesMax]
			},
			series: filter.series,
			published: {
				$between: [filter.published, new Date().getFullYear()]
			}
		}
	}).then(books=>{
		res.send(books)
	})

	//Author filled in
	// if(author != "") {
	// 	db.book.findAll({
	// 		where: {
	// 			author: author
	// 		}
	// 	}).then(book => {
	// 		let result = []
	// 		if(pagesMax != ""){
	// 			//Max pages and language filled in
	// 			if(language != ""){
	// 				//Max pages, language and genre filled in
	// 				if(genre != ""){
	// 					for(let i = 0; i < book.length; i++) {
	// 						for(let j = 0; j < book[i].genre.length; j++) {
	// 							if(pagesMax >= book[i].pages && pagesMin <= book[i].pages && language == book[i].language && genre == book[i].genre[j]) {
	// 								result.push({
	// 									title: book[i].title,
	// 									author: book[i].author,
	// 									genre: book[i].genre,
	// 									pages: book[i].pages,
	// 									linkid: book[i].linkid,
	// 									series: book[i].series,
	// 									published: book[i].published,
	// 									language: book[i].language
	// 								})
	// 							}
	// 						}
	// 					}
	// 				}
	// 				//Max pages, language but no genre filled in
	// 				else {
	// 					for(let i = 0; i < book.length; i++) {
	// 						if(pagesMax >= book[i].pages && pagesMin <= book[i].pages && language == book[i].language) {
	// 							result.push({
	// 								title: book[i].title,
	// 								author: book[i].author,
	// 								genre: book[i].genre,
	// 								pages: book[i].pages,
	// 								linkid: book[i].linkid,
	// 								series: book[i].series,
	// 								published: book[i].published,
	// 								language: book[i].language
	// 							})
	// 						}
	// 					}
	// 				}
	// 			}
	// 			//No language filled in
	// 			else {
	// 				//Max pages and genre filled in
	// 				if(genre != ""){
	// 					for(let i = 0; i < book.length; i++) {
	// 						for(let j = 0; j < book[i].genre.length; j++) {
	// 							if(pagesMax >= book[i].pages && pagesMin <= book[i].pages && genre == book[i].genre[j]) {
	// 								result.push({
	// 									title: book[i].title,
	// 									author: book[i].author,
	// 									genre: book[i].genre,
	// 									pages: book[i].pages,
	// 									linkid: book[i].linkid,
	// 									series: book[i].series,
	// 									published: book[i].published,
	// 									language: book[i].language
	// 								})
	// 							}
	// 						}
	// 					}
	// 				}
	// 				//Only max pages filled in
	// 				else {
	// 					for(let i = 0; i < book.length; i++) {
	// 						if(pagesMax >= book[i].pages && pagesMin <= book[i].pages) {
	// 							result.push({
	// 								title: book[i].title,
	// 								author: book[i].author,
	// 								genre: book[i].genre,
	// 								pages: book[i].pages,
	// 								linkid: book[i].linkid,
	// 								series: book[i].series,
	// 								published: book[i].published,
	// 								language: book[i].language
	// 							})
	// 						}
	// 					}
	// 				}
	// 			}
	// 		}
	// 		//No max pages filled in
	// 		else {
	// 			//Language filled in
	// 			if(language != ""){
	// 				//Language and genre filled in
	// 				if(genre != ""){
	// 					for(let i = 0; i < book.length; i++) {
	// 						for(let j = 0; j < book[i].genre.length; j++) {
	// 							if(pagesMin <= book[i].pages && language == book[i].language && genre == book[i].genre[j]) {
	// 								result.push({
	// 									title: book[i].title,
	// 									author: book[i].author,
	// 									genre: book[i].genre,
	// 									pages: book[i].pages,
	// 									linkid: book[i].linkid,
	// 									series: book[i].series,
	// 									published: book[i].published,
	// 									language: book[i].language
	// 								})
	// 							}
	// 						}
	// 					}
	// 				}
	// 				//Only language filled in
	// 				else {
	// 					for(let i = 0; i < book.length; i++) {
	// 						if(pagesMin <= book[i].pages && language == book[i].language) {
	// 							result.push({
	// 								title: book[i].title,
	// 								author: book[i].author,
	// 								genre: book[i].genre,
	// 								pages: book[i].pages,
	// 								linkid: book[i].linkid,
	// 								series: book[i].series,
	// 								published: book[i].published,
	// 								language: book[i].language
	// 							})
	// 						}
	// 					}
	// 				}
	// 			}
	// 			//Nothing filled in
	// 			else {
	// 				for(let i = 0; i < book.length; i++) {
	// 					result.push({
	// 						title: book[i].title,
	// 						author: book[i].author,
	// 						genre: book[i].genre,
	// 						pages: book[i].pages,
	// 						linkid: book[i].linkid,
	// 						series: book[i].series,
	// 						published: book[i].published,
	// 						language: book[i].language
	// 					})
	// 				}
	// 			}
	// 		}
	// 		return result
	// 	}).then(book => {
	// 		if(book != ""){
	// 			res.render('result', {book: book})
	// 		}
	// 		else {
	// 			res.send("Nothing filled in!")
	// 		}
	// 	})
	// }
	// else {
	// 	//No author filled in
	// 	db.book.findAll().then(book => {
	// 		let result = []
	// 		//Series = true
	// 		if(series != "") {
	// 			//Max pages filled in
	// 			if(pagesMax != ""){
	// 				//Max pages and language filled in
	// 				if(language != ""){
	// 					//Max pages, language and genre filled in
	// 					if(genre != ""){
	// 						for(let i = 0; i < book.length; i++) {
	// 							for(let j = 0; j < book[i].genre.length; j++) {
	// 								if(series == "true" && pagesMax >= book[i].pages && pagesMin <= book[i].pages && language == book[i].language && genre == book[i].genre[j]) {
	// 									result.push({
	// 										title: book[i].title,
	// 										author: book[i].author,
	// 										genre: book[i].genre,
	// 										pages: book[i].pages,
	// 										linkid: book[i].linkid,
	// 										series: book[i].series,
	// 										published: book[i].published,
	// 										language: book[i].language
	// 									})
	// 								}
	// 							}
	// 						}
	// 					}
	// 					//Max pages, language but no genre filled in
	// 					else {
	// 						for(let i = 0; i < book.length; i++) {
	// 							if(pagesMax >= book[i].pages && pagesMin <= book[i].pages && language == book[i].language) {
	// 								result.push({
	// 									title: book[i].title,
	// 									author: book[i].author,
	// 									genre: book[i].genre,
	// 									pages: book[i].pages,
	// 									linkid: book[i].linkid,
	// 									series: book[i].series,
	// 									published: book[i].published,
	// 									language: book[i].language
	// 								})
	// 							}
	// 						}
	// 					}
	// 				}
	// 				//No language filled in
	// 				else {
	// 					//Max pages and genre filled in
	// 					if(genre != ""){
	// 						for(let i = 0; i < book.length; i++) {
	// 							for(let j = 0; j < book[i].genre.length; j++) {
	// 								if(pagesMax >= book[i].pages && pagesMin <= book[i].pages && genre == book[i].genre[j]) {
	// 									result.push({
	// 										title: book[i].title,
	// 										author: book[i].author,
	// 										genre: book[i].genre,
	// 										pages: book[i].pages,
	// 										linkid: book[i].linkid,
	// 										series: book[i].series,
	// 										published: book[i].published,
	// 										language: book[i].language
	// 									})
	// 								}
	// 							}
	// 						}
	// 					}
	// 					//Only max pages filled in
	// 					else {
	// 						for(let i = 0; i < book.length; i++) {
	// 							if(pagesMax >= book[i].pages && pagesMin <= book[i].pages) {
	// 								result.push({
	// 									title: book[i].title,
	// 									author: book[i].author,
	// 									genre: book[i].genre,
	// 									pages: book[i].pages,
	// 									linkid: book[i].linkid,
	// 									series: book[i].series,
	// 									published: book[i].published,
	// 									language: book[i].language
	// 								})
	// 							}
	// 						}
	// 					}
	// 				}
	// 			}
	// 			//No max pages filled in
	// 			else {
	// 				//Language filled in
	// 				if(language != ""){
	// 					//Language and genre filled in
	// 					if(genre != ""){
	// 						for(let i = 0; i < book.length; i++) {
	// 							for(let j = 0; j < book[i].genre.length; j++) {
	// 								if(pagesMin <= book[i].pages && language == book[i].language && genre == book[i].genre[j]) {
	// 									result.push({
	// 										title: book[i].title,
	// 										author: book[i].author,
	// 										genre: book[i].genre,
	// 										pages: book[i].pages,
	// 										linkid: book[i].linkid,
	// 										series: book[i].series,
	// 										published: book[i].published,
	// 										language: book[i].language
	// 									})
	// 								}
	// 							}
	// 						}
	// 					}
	// 					//Only language filled in
	// 					else {
	// 						for(let i = 0; i < book.length; i++) {
	// 							if(pagesMin <= book[i].pages && language == book[i].language) {
	// 								result.push({
	// 									title: book[i].title,
	// 									author: book[i].author,
	// 									genre: book[i].genre,
	// 									pages: book[i].pages,
	// 									linkid: book[i].linkid,
	// 									series: book[i].series,
	// 									published: book[i].published,
	// 									language: book[i].language
	// 								})
	// 							}
	// 						}
	// 					}
	// 				}
	// 				//Nothing filled in
	// 				else {
	// 					for(let i = 0; i < book.length; i++) {
	// 						result.push({
	// 							title: book[i].title,
	// 							author: book[i].author,
	// 							genre: book[i].genre,
	// 							pages: book[i].pages,
	// 							linkid: book[i].linkid,
	// 							series: book[i].series,
	// 							published: book[i].published,
	// 							language: book[i].language
	// 						})
	// 					}
	// 				}
	// 			}
	// 		}
	// 		//Series = false
	// 		else {
	// 			//Max pages filled in
	// 			if(pagesMax != ""){
	// 				//Max pages and language filled in
	// 				if(language != ""){
	// 					//Max pages, language and genre filled in
	// 					if(genre != ""){
	// 						for(let i = 0; i < book.length; i++) {
	// 							for(let j = 0; j < book[i].genre.length; j++) {
	// 								if(series == "false" && pagesMax >= book[i].pages && pagesMin <= book[i].pages && language == book[i].language && genre == book[i].genre[j]) {
	// 									result.push({
	// 										title: book[i].title,
	// 										author: book[i].author,
	// 										genre: book[i].genre,
	// 										pages: book[i].pages,
	// 										linkid: book[i].linkid,
	// 										series: book[i].series,
	// 										published: book[i].published,
	// 										language: book[i].language
	// 									})
	// 								}
	// 							}
	// 						}
	// 					}
	// 					//Max pages, language but no genre filled in
	// 					else {
	// 						for(let i = 0; i < book.length; i++) {
	// 							if(pagesMax >= book[i].pages && pagesMin <= book[i].pages && language == book[i].language) {
	// 								result.push({
	// 									title: book[i].title,
	// 									author: book[i].author,
	// 									genre: book[i].genre,
	// 									pages: book[i].pages,
	// 									linkid: book[i].linkid,
	// 									series: book[i].series,
	// 									published: book[i].published,
	// 									language: book[i].language
	// 								})
	// 							}
	// 						}
	// 					}
	// 				}
	// 				//No language filled in
	// 				else {
	// 					//Max pages and genre filled in
	// 					if(genre != ""){
	// 						for(let i = 0; i < book.length; i++) {
	// 							for(let j = 0; j < book[i].genre.length; j++) {
	// 								if(pagesMax >= book[i].pages && pagesMin <= book[i].pages && genre == book[i].genre[j]) {
	// 									result.push({
	// 										title: book[i].title,
	// 										author: book[i].author,
	// 										genre: book[i].genre,
	// 										pages: book[i].pages,
	// 										linkid: book[i].linkid,
	// 										series: book[i].series,
	// 										published: book[i].published,
	// 										language: book[i].language
	// 									})
	// 								}
	// 							}
	// 						}
	// 					}
	// 					//Only max pages filled in
	// 					else {
	// 						for(let i = 0; i < book.length; i++) {
	// 							if(pagesMax >= book[i].pages && pagesMin <= book[i].pages) {
	// 								result.push({
	// 									title: book[i].title,
	// 									author: book[i].author,
	// 									genre: book[i].genre,
	// 									pages: book[i].pages,
	// 									linkid: book[i].linkid,
	// 									series: book[i].series,
	// 									published: book[i].published,
	// 									language: book[i].language
	// 								})
	// 							}
	// 						}
	// 					}
	// 				}
	// 			}
	// 			//No max pages filled in
	// 			else {
	// 				//Language filled in
	// 				if(language != ""){
	// 					//Language and genre filled in
	// 					if(genre != ""){
	// 						for(let i = 0; i < book.length; i++) {
	// 							for(let j = 0; j < book[i].genre.length; j++) {
	// 								if(pagesMin <= book[i].pages && language == book[i].language && genre == book[i].genre[j]) {
	// 									result.push({
	// 										title: book[i].title,
	// 										author: book[i].author,
	// 										genre: book[i].genre,
	// 										pages: book[i].pages,
	// 										linkid: book[i].linkid,
	// 										series: book[i].series,
	// 										published: book[i].published,
	// 										language: book[i].language
	// 									})
	// 								}
	// 							}
	// 						}
	// 					}
	// 					//Only language filled in
	// 					else {
	// 						for(let i = 0; i < book.length; i++) {
	// 							if(pagesMin <= book[i].pages && language == book[i].language) {
	// 								result.push({
	// 									title: book[i].title,
	// 									author: book[i].author,
	// 									genre: book[i].genre,
	// 									pages: book[i].pages,
	// 									linkid: book[i].linkid,
	// 									series: book[i].series,
	// 									published: book[i].published,
	// 									language: book[i].language
	// 								})
	// 							}
	// 						}
	// 					}
	// 				}
	// 				//Nothing filled in
	// 				else {
	// 					for(let i = 0; i < book.length; i++) {
	// 						result.push({
	// 							title: book[i].title,
	// 							author: book[i].author,
	// 							genre: book[i].genre,
	// 							pages: book[i].pages,
	// 							linkid: book[i].linkid,
	// 							series: book[i].series,
	// 							published: book[i].published,
	// 							language: book[i].language
	// 						})
	// 					}
	// 				}
	// 			}
	// 		}
	// 		return result
	// 	}).then(book => {
	// 		if(book != ""){
	// 			res.render('result', {book: book})
	// 		}
	// 		else {
	// 			res.send("Nothing filled in!")
	// 		}
	// 	})
	// }
})

module.exports = router