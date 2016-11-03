var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.all('/:username', function(req, res, next) {
	next();
	res.send('use all type to return username :' + req.params.username);
});

router.get('/:username', function(req, res, next) {
  // res.send('respond with a resource': req.params.username);
  console.log(req.params);
  res.send('use get type to return username: ' + req.params.username);
});

module.exports = router;
