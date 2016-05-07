var express = require('express');
var router = express.Router();
var knex = require('../../../db/knex');

//view all books
router.get('/', function(req, res, next) {
		knex.select('*').from('books')
		.then(function(data){
		// console.log(data)
	 res.render('books', { 'books': data});
	})
});

//view new book page
router.get('/new', function(req, res, next){
	res.render('newbook', {title: 'new book'})
})

//posts new book info
router.post('/new', function(req, res, next){
	var id = req.params.id
		// console.log(req.body)

	knex('books').insert({
		title: req.body.title,
		genre: req.body.genre,
		image: req.body.image[0],
		description: req.body.description

	}).then(function(){
		knex('authors').insert({
			name: req.body.author,
			biography: req.body.biography,
			image: req.body.image[1]
			
		})
	})
	// knex('book_lists').insert({
	// 	author_id: knex('authors').max('id')[0].max,
	// 	book_id: knex('books').max('id')[0].max
	// })
	.then(function(){
		res.redirect('/books')
	})
})

//views single book
router.get('/:id', function(req, res, next) {
	var id = req.params.id
		// knex.from('books').where('id', id)
	knex.select(
		'books.id AS books_id','books.title', 'books.genre', 'books.description', 
		'books.image', 'authors.id AS authors_id','authors.name')
		.from('books')
		.leftJoin('book_lists', 'books.id', 'book_id')
		.leftJoin('authors', 'authors.id', 'book_lists.author_id')
		.where('books.id', id)	
		.then(function(data){
			console.log('SINGLE BOOK',data)
  	res.render('singlebook', { books: data });
	})
});

//views single book edit page
router.get('/:id/edit', function(req, res, next) {
	var id = req.params.id
	knex.select(
		'books.id','books.title', 'books.genre', 'books.description', 
		'books.image', 'authors.name')
		.from('books')
		.leftJoin('book_lists', 'books.id', 'book_id')
		.leftJoin('authors', 'authors.id', 'book_lists.author_id')
		.where('books.id', id)
	.then(function(data){
  	res.render('editbook', { books: data });
	})
});

//posts edited info for single book
router.post('/:id/edit', function(req, res, next) {
	var id = req.params.id
	knex.from('books').where('id', id).update({
		title: req.body.title,
		genre: req.body.genre,
		image: req.body.image,
		description: req.body.description
	})
	.then(function(data){
  	res.redirect('/books/'+ id);
	})
});

//takes you to delete single book page
router.get('/:id/delete', function(req, res, next){
	var id = req.params.id
knex.select(
		'books.id','books.title', 'books.genre', 'books.description', 
		'books.image', 'authors.name')
		.from('books')
		.leftJoin('book_lists', 'books.id', 'book_id')
		.leftJoin('authors', 'authors.id', 'book_lists.author_id')
		.where('books.id', id)
	.then(function(data){
		res.render('deletebook', {books: data})
	})
})

//deletes actual book
router.post('/:id/delete', function(req, res, next){
	var id = req.params.id;
	knex('books').where('id', id).del()
	.then(function(){
		res.redirect('/books');
		
	});
});






module.exports = router;
