var pub = require('./pub');

exports.get = function(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/html'
	});

	res.end(pub.page('首页', pub.navbar(), []));
}