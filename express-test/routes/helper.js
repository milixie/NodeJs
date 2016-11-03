var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('helper', {
		title : 'helper 视图助手',
		_req: req,
		_res: res
	})
})

module.exports = router;