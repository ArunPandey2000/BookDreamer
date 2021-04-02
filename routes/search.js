//Search Route

const express = require('express');
const router = express.Router();
const db = require(__dirname + '/database');

//Get

router.get('/search', (req, res) => {
  res.render('index');
});

//Post Read PostgreSQL Database

router.post('/search', (req, res) => {
  let publish = [];
  let inputText = req.body.inputText.toUpperCase();

  //Put publishing years into an array
  if (req.body.twoTen == 'true') {
    publish.push(new Date().getFullYear(), 2010);
  }
  if (req.body.two == 'true') {
    publish.push(2010, 2000);
  }
  if (req.body.nineFive == 'true') {
    publish.push(2000, 1950);
  }
  if (req.body.nine == 'true') {
    publish.push(1950, 1900);
  }
  if (req.body.eigth == 'true') {
    publish.push(1900, 1800);
  }
  if (req.body.zero == 'true') {
    publish.push(1800, 0000);
  }

  //Change value genre and language to undefined when not specified
  if (req.body.genre == 0) {
    req.body.genre = undefined;
  }

  if (req.body.language == 0) {
    req.body.language = undefined;
  }

  //Object for filter options
  let filter = {};

  //Check if filter options are filled in or not

  if (req.body.language) filter.language = req.body.language;
  if (req.body.author) filter.author = { $iLike: '%' + req.body.author + '%' };
  if (req.body.genre) filter.genre = { $contains: [req.body.genre] };
  if (req.body.pagesMax && req.body.pagesMin)
    filter.pages = { $between: [req.body.pagesMin, req.body.pagesMax] };
  if (req.body.pagesMax && req.body.pagesMin == '')
    filter.pages = { $between: [0, req.body.pagesMax] };
  if (req.body.series) filter.series = req.body.series;
  if (publish.length != 0)
    filter.published = { $between: [publish.slice(-1)[0], publish[0]] };
  if (req.body.rating) filter.rating = { $between: [req.body.rating, 5] };

  db.book
    .findAll({
      where: filter,
    })
    .then((books) => {
      let result = [];
      for (let i = 0; i < books.length; i++) {
        if (
          books[i].title.toUpperCase().match(inputText) ||
          books[i].summary.toUpperCase().match(inputText)
        ) {
          result.push(books[i]);
        }
      }
      if (result.length != 0) {
        res.render('result', { book: result });
      } else {
        res.render('result', { book: books });
      }
    });
});

module.exports = router;
