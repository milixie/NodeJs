var http = require('http');
var util = require('util');
var urls = require('url');

http.createServer(function(req, res) {
	req.urls = urls.parse(req.url, true);
	req.a = (req.urls.query.a && !isNaN(req.urls.query.a)) ? new Number(req.urls.query.a) : NaN;
	req.b = (req.urls.query.b && !isNaN(req.urls.query.b)) ? new Number(req.urls.query.b) : NaN;


	switch(req.urls.pathname) {
		case '/': 
			require('./home.js').get(req, res);
			break;
		case '/add':
			require('./add.js').get(req, res);
			break;
		case '/sub':
			require('./sub.js').get(req, res);
			break;
		case '/multi':
			require('./multi.js').get(req, res);
			break;
		case '/divis':
			require('./divis.js').get(req, res);
			break;
		case '/remain':
			require('./remain.js').get(req, res);
			break;
		case '/square':
			require('./square.js').get(req, res);
			break;
		case '/factorial':
			require('./factorial.js').get(req, res);
			break;
		default: 
			res.writeHead(404, {
				'Content-Type': 'text/plain'
			});
			res.end('bad url , err');
			break;
	}
}).listen(3000);

console.log('listening to the url : http://localhost:3000');