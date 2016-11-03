var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('about', { 
		time: '2014-01-12',
		ceo: 'mili',
		layout: 'layout2.ejs'
	});
});

module.exports = router;