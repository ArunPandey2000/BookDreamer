//Result Route

const express 	= require( 'express')
const router	= express.Router( )
const db		= require(__dirname + '/database')

//Get

router.get('/result', (req, res) => {
	db.book.findAll().then(book => {
		res.render('result', {book: book})
	})
})

//Post


module.exports = router