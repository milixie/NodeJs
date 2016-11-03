var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('list', {
		items :['info-first', 'info-second', 'info-third']
	});
});

module.exports = router;
