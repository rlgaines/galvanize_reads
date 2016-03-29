var express = require('express');
var router = express.Router();
var knex = require('../../../db/knex');

//views all authors
router.get('/', function(req, res, next) {
	knex.select('*').from('authors')
	.then(function(data){
		// console.log(data)
	 res.render('authors', { 'authors': data});
	})
});

//views new author input page
router.get('/new', function(req, res, next){
	res.render('newauthor', {title: 'new author'})
})

//posts new author info
router.post('/new', function(req, res, next){
	var id = req.params.id
		console.log(req.body)

	knex('authors').insert({
		name: req.body.name,
		image: req.body.image,
		biography: req.body.biography
	}).then(function(data){
		console.log(data)
		res.redirect('/authors')

	})
})

//views single author
router.get('/:id', function(req, res, next) {
	var id = req.params.id
	knex.from('authors').where('id', id)
	.then(function(data){
  	res.render('authors', { authors: data });
	})
});

//views single edit page
router.get('/:id/edit', function(req, res, next) {
	var id = req.params.id
	knex.from('authors').where('id', id)
	.then(function(data){
  	res.render('editauthor', { authors: data });
	})
});

//posts edited information of author
router.post('/:id/edit', function(req, res, next) {
	var id = req.params.id
	knex.from('authors').where('id', id)
	.update({
		name: req.body.name,
		image: req.body.image,
		biography: req.body.biography
	})
	.then(function(data){
  	res.redirect('/authors/'+ id);
	})
});

//views delete page of single author
router.get('/:id/delete', function(req, res, next){
	var id = req.params.id
	knex('authors').where('id', id)
	.then(function(data){
		res.render('deleteauthor', {authors: data})
	})
})

//deletes that author
router.post('/:id/delete', function(req, res, next){
	var id = req.params.id;
	knex('authors').where('id', id).del()
	.then(function(){
		res.redirect('/authors');
		
	});
});

module.exports = router;
