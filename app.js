var express = require('express');
var mongoose = require('mongoose')
var _ = require('underscore')
var Movie = require('./models/movie')
var bodyParser = require('body-parser')
var path = require('path')
var port = 3000;
var app = express();

mongoose.connect('mongodb://localhost/movie')
app.set('views','./views/pages');
app.set('view engine','jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));
app.locals.moment = require('moment')
app.listen(port);

app.get('/',function (req,res) {
	Movie.fetch(function (err,movie) {
		if (err) {
			console.log(err)
		};
		res.render('index',{
			title:'Movie 首页',
			movies:movie
		})
	})
});
app.get('/admin/update/:id',function (req,res) {
	var id = req.params.id
	if (id) {
		Movie.findById(id,function (err,movie) {
			res.render('admin',{
				title:'Movie后台更新页',
				movie:movie
			})
		})
	};
})
app.post('/admin/movie/new',function (req,res) {
	var id = req.body.movie._id
	var movieObj = req.body.movie
	var _movie
	if (id != "undefined") {
		Movie.findById(id,function (err,movie) {
			if (err) {
				console.log(err)
			}

			_movie = _.extend(movie,movieObj)
			_movie.save(function (err,movie) {
				if (err) {
					console.log(err)
				}
				res.redirect('/movie/'+movie._id)
			})
		})
	}else{
		_movie = new Movie({
			doctor:movieObj.doctor,
			title:movieObj.title,
			country:movieObj.country,
			language:movieObj.language,
			poster:movieObj.poster,
			flash:movieObj.flash,
			year:movieObj.year,
			summary:movieObj.summary
		})
		_movie.save(function (err,movie) {
			if (err) {
				console.log(err)
			}
			res.redirect('/movie/'+movie._id)
		})
	}
})

app.get('/list',function (req,res) {
	Movie.fetch(function (err,movie) {
		if (err) {
			console.log(err)
		}
		res.render('list',{
			title:'Movie 列表页',
			movies:movie
		})
	})
});
app.delete('/admin/list',function (req,res) {
	var id = req.body.id
	if (id) {
		Movie.remove({_id:id},function  (err,movie) {
			if (err) {
				res.json({status: 500,error:err})
			}else{
				res.json({status: 200})
			}
		})
	};
})
//detail
app.get('/movie/:id',function (req,res) {

	var id = req.params.id
	Movie.findById(id,function (err,movie) {
		if (err) {
			console.log(err)
		};
		res.render('detail',{
			title:'Movie'+movie.title,
			movie:movie
		})
	})
});

app.get('/admin',function (req,res) {
	res.render('admin',{
		title:'Movie 后台录入页',
		movie:{
			title:"",
			doctor:"",
			country:"",
			language: "",
			year:"",
			flash:"",
			poster:"",
			summary:""
		}
	})
});
