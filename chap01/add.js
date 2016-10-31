var pub = require('./pub');

exports.get = function(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/html'
	});

	res.end(pub.page('基本运算', pub.navbar(), 
		['<table>',
			'<tr>',
				'<td>数值a</td>',
				'<td>运算符</td>',
				'<td>数值b</td>',
				'<td>等号</td>',
				'<td>结果</td>',
			'</tr>',
			'<tr>',
				'<td>{a}</td>',
				'<td>+</td>',
				'<td>{b}</td>',
				'<td>=</td>',
				'<td>{result}</td>',
			'</tr>',
		'</table>',
		'<form name="add" action="/add" method="get">',
			'<p>请输入a的值：<input type="text" name="a"/></p>',
			'<p>请输入b的值：<input type="text" name="b"/></p>',
			'<p>点击提交：<input type="submit" value="提交"/></p>',
		'</form>']
		.join('\n')
		.replace('{a}', (!isNaN(req.a) ? req.a : "a" ))
		.replace('{b}', (!isNaN(req.b) ? req.b : "b" ))
		.replace('{result}', (!isNaN(req.a) && !isNaN(req.b) ? req.a + req.b : "?"))
		)
	);
}