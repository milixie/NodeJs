var pub = require('./pub');
var math = require('./math');

exports.get = function(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/html'
	});

	res.end(pub.page('基本运算', pub.navbar(), 
		['<table>',
			'<tr>',
				'<td>数值a</td>',
				'<td>运算值</td>',
				'<td>等号</td>',
				'<td>结果</td>',
			'</tr>',
			'<tr>',
				'<td>{a}</td>',
				'<td>{a}！</td>',
				'<td>=</td>',
				'<td>{result}</td>',
			'</tr>',
		'</table>',
		'<form name="factorial" action="/factorial" method="get">',
			'<p>请输入a的值：<input type="text" name="a"/></p>',
			'<p>点击提交：<input type="submit" value="提交"/></p>',
		'</form>']
		.join('\n')
		.replace(/{a}/g, (!isNaN(req.a) ? req.a : "a" ))
		.replace('{result}', (!isNaN(req.a) ? math.factorial(req.a) : "?"))
		)
	);
}