
exports.navbar = function() {
	return ['<ul class="navbar">',
			'<li><a href="/">首页</a></li>',
			'<li><a href="/add">加法</a></li>',
			'<li><a href="/sub">减法</a></li>',
			'<li><a href="/multi">乘法</a></li>',
			'<li><a href="/divis">除法</a></li>',
			'<li><a href="/remain">取余</a></li>',
			'<li><a href="/square">平方</a></li>',
			'<li><a href="/factorial">n的阶乘</a></li>',
			'</ul>'].join('\n');
};

// exports.table = function(symbol, sym) {
// 	return ['<form action="/" method="get">',
// 			'<table>',
// 				'<tr>',
// 					'<td>数值a</td>',
// 					'<td>运算符</td>',
// 					'<td>数值b</td>',
// 					'<td>提交</td>',
// 					'<td>结果</td>',
// 				'</tr>',
// 				'<tr>',
// 					'<td>{a}</td>',
// 					'<td>{sym}</td>',
// 					'<td>{b}</td>',
// 					'<td><input type="submit" value=""/></td>',
// 					'<td>{result}</td>',
// 				'</tr>',
// 			'</table>',
// 		'</form>']
// 		.join('\n')
// 		.replace('{symbol}', symbol)
// 		.replace('{sym}', sym)
// 		;
// }

exports.page = function(title, navbar, content){
	return ['<!DOCTYPE html>',
			'<html>',
				'<head>',
					'<meta charset="utf-8">',
					'<title>{title}</title>',
				'</head>',
				'<body>',
					'{navbar}',
					'{content}',
				'</body>',
			'</html>']
			.join('\n')
			.replace('{title}', title, 'g')
			.replace('{navbar}', navbar ,'g')
			.replace('{content}', content, 'g');
}