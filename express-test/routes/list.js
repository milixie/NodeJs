var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	res.render('list', {
		items: ['mili', 1992, 'girl']
	});
});

module.exports = router;
