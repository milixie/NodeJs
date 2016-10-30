## Node.js 学习笔记 ##

**概念**：node.js是一个让javascript运行在服务端的开发平台

**特点**：

- 运行快（引擎引用的是v8，和chrome的引擎一样）
- 单线程
- 异步I/O与事件驱动

传统：
```
res = db.query('select * from user');
res.output();
```
Node.js:
```
res = db.query('select * from user', function(res){
	res.output();
})
```

**Node.js命令行工具**：

- node  //进入编译模式
- node -v  //查看脚本
- node -e console.log('dddddd')  //执行
- node index.js  //运行文件

**建立HTTP服务器**
创建一个app.js

```
var http = require('http');
http.createServer(function(req, res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('<h2>This is header, and I have a server!</h2>');
	res.end('this is content!');
}).listen(5858);
console.log('HTTP server is listening at port 5858');
```
在命令行中`node app.js`，打开`http://localhost:5858`即可访问

避免每次修改代码后都要重启服务，可以安装supervisor
`npm install supervisor -g`，使用`supervisor app.js`直接启动监听服务


**Node.js异步I/O与事件编程**

异步模式

file.txt文件中：
`console.log('this is a file txt')`

```
var fs = require('file');
fs.readFile('file.txt', 'UTF-8', function(err, data){
	if(err){
		console.log('read file error');
	} else{
		console.log(data);	
	}
});
console.log('read end');
//结果为：
read end
this is a file txt
```

同步模式：
```
var fs = require('file');
var data = fs.readFileSync('file.txt', 'UTF-8');
console.log(data);
console.log('read end');
//结果是： 
this is a file txt
read end
```

使用的是事件的回调函数：
```
//事件对象
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();
//注册事件
event.on('mili_event', function(){
	console.log('这是我的自定义事件！！！');
});
//触发事件
setInterval(function(){
	event.emit('mili_event');
}, 1000);
```

**模块和包**

创建模块：
- exports  模块公开的接口
- require  从外部获取一个模块的接口，获取模块的exports对象

模块化：方法一
```
//module.js文件中
var name;
exports.setName = function(n){
	name = n;
};
exports.sayHello = function(){
	console.log('Hello ' + name);
}
//app.js文件中
var r = require('./module');
r.setName('mili');
r.sayHello();
//启动node
`node app.js`
//运行结果为： Hello mili
```

方法二：
```
//module.js文件中
function hello(){
	var name;
	this.setName = function(n){
		name = n;
	};
	this.sayHello = function(){
		console.log('hello ' + name2);
	}
}
module.exports = hello;
//app.js文件中
var hello = require('./module');
var h1 = new hello();
h1.setName('mili');
h1.sayHello();
var h2 = new hello();
h2.setName('xie');
h2.sayHello();
//结果：
hello mili
hello xie
```

**包管理器npm**

```
//安装
npm install/i package_name
//卸载
npm unstall package_name\
//查看当前所有的包
npm list
//初始化package.json
npm init
//包的发布
npm publish
//取消发布
npm unpublish
//帮助
npm help json
```

**全局对象和全局变量**

js中window是全局对象
node.js中global是全局对象

process：用于描述当前node.js进程状态的对象，提供了一个与操作系统的简单接口，通常写本地命令行程序的时候，会用到它

process.argv：命令行参数数组，第一个元素是node，第二个元素是脚本文件名，第三个元素开始是运行参数

```
//argv.js文件中
console.log(process.argv)
//cmd中
node argv.js 'mili' 'xie' 1992
//打印出的结果是
$ node argv.js 'mili' 'xie' 1992
[ 'd:\\nodejs\\node.exe',
  'g:\\mili\\process\\argv.js',
  'mili',
  'xie',
  '1992' ]
```

process.stdin:标准输入流
process.stdout:标准输出流，通常我们使用的是`console.log`，但是底层是使用`process.stdout.write()`来实现的

```
//恢复流
process.stdin.resume();
process.stdin.on('data', function(data){
	process.stdout.write('read from console '+ data.toString());
})
//cmd命令中
XML@XML-PC /g/mili/process
$ node stdin.js
xie
read from console  xie
mili
read from console  mili
1992
read from console  1992
```

process.nextTick(callback)：功能是为事件循环设置一次任务，node.js会在下次事件循环调响应时调用callback，把复杂的工作拆散，编程一个较小的事件

```

function someThing(args){
	console.log('this is ' + args);
}

function compute(){
	console.log('to end');
}

// function doSome(args, callback){
// 	someThing(args);
// 	callback();
// }
//使用process.nextTick();
function doSome(args, callback){
	someThing(args);
	process.nextTick(callback);
}

doSome('xiemeili', function(){
	compute();
})
```

console:
```
console.log()
console.error()
console.info()
console.trace()//debug打断点，输出当前的调用栈
```

**常用工具util和事件EventEmitter**

1.util全局变量
- util.inherits(constructor, superConstructor)
子类继承父类中原型扩展的东西
```
var util = require('util');
function Person(){
	this.name = 'mili';
	this.age = 12;
	this.show = function(){
		console.log('Name is ' + this.name + ' and age is ' + this.age);
	}
}

Person.prototype.eyesColor = function() {
	console.log( this.name + ' eyes color is blue ');
};

var p = new Person();
p.show();
p.eyesColor();

function Me(){
	this.name = 'xiemeili';
}
//只会继承prototype原型扩展中的方法，Person自身定义的不会继承
util.inherits(Me, Person);//子类会继承父类

var p2 = new Me();

// p2.show();会报错
p2.eyesColor();
```

- util.inspect(obj, [showHidden], [depth], [color])

将任意对象转换为字符串的方法，通常用于调试和错误输出，它至少接受一个参数object


**events**

1.事件发射器
`events`模块提供的一个对象是`events.EventEmitter`，`EventEmitter`的核心就是事件发射与事件接听功能的封装，可以支持若干个事件监听器

常用API介绍：
`EventEmitter.on(events, listener);`注册事件
`EventEmitter.emit(events, [args1], [args2]);`触发事件
`EventEmitter.removeListener(events, listener);`移除某个事件的某个监听器
`EventEmitter.removeAllListener([events]);`移除某个/所有事件的所有监听器

具体代码的实现：
```
var e = require('events');

var emitter = new e.EventEmitter();
//注册事件1
emitter.on('myEvent', function(a, b){
	console.log('lister first ', a , b);
});
//注册事件2
emitter.on('myEvent', function(a, b){
	console.log('lister second ', a , b);
});
//触发事件
emitter.emit('myEvent', 'mili', 1992);

var emitterOnce = new e.EventEmitter();

emitterOnce.once('event2', function(obj){
	console.log('once 注册一次监听事件', obj);
})
emitterOnce.emit('event2', 'once');
emitterOnce.emit('event2', 'once2');  //第二次无法触发

var emitterRemove = new e.EventEmitter();

function test(a, b, c){
	console.log('event3 remove test', a, b, c);
}

emitterRemove.on('event3', test);

emitterRemove.emit('event3', 'xie' , 'mei', 'li');
//移除事件
emitterRemove.removeListener('event3', test);
emitterRemove.emit('event3', 'hahaha' , 'mei', 'li');//不会再触发

function test2(){
	console.log('remove All lister');
}

var emitterRemoveAll = new e.EventEmitter();

emitterRemoveAll.on('event4', test);
emitterRemoveAll.on('event5', test2);

emitterRemoveAll.emit('event4', '1', '2', '3');
emitterRemoveAll.emit('event5');
//移除event4
emitterRemoveAll.removeAllListeners('event4');

emitterRemoveAll.emit('event4', '333331', '2', '3');//已经被remove监听，不会执行
emitterRemoveAll.emit('event5');  //会继续执行

//移除所有事件的所有的监听
emitterRemoveAll.removeAllListeners();
//所有事件都不会执行
emitterRemoveAll.emit('event4', '4', '4', '333');
emitterRemoveAll.emit('event5');

```

2.error事件：已经注册好的事件，可以直接触发

```
var e = require('events');

var emitter = new e.EventEmitter();

emitter.emit('error');
```

3.继承EventEmitter：大多数情况下，我们不会自己注册事件，而是直接继承它，包括fs，net，http在内等，只要是支持事件相应的核心模块都是EventEmitter的子类

```
var fs = require('fs');

fs.readFile('file.txt', 'UTF-8', function(err, data){
	console.log(err, data);
	if(err){
		console.log('error');
	} else{
		console.log(data);
	}
})
```

**文件操作fs**

fs模块中所有的操作都提供了异步和同步两个版本

API地址：[https://nodejs.org/dist/latest-v7.x/docs/api/fs.html](https://nodejs.org/dist/latest-v7.x/docs/api/fs.html "node.js fs API")

常用API：
- fs.readFile(filename, [encoding], [callback(err, data)])
- fs.readFileSync(filename, [encoding])

```
var fs = require('fs');

fs.readFile('file.txt', 'UTF-8', function(err, data){
	console.log(err, data);
	if(err){
		console.log('error');
	} else{
		console.log(data);
	}
})
//没有encoding，打印出二进制buffer
fs.readFile('file.txt', function(err, data){
	// console.log(err, data);
	if(err){
		console.log('error');
	} else{
		console.log(data);
	}
});
//同步读取文件
try{
	var data = fs.readFileSync('file.txt', 'UTF-8');
	console.log(data);
	console.log('read ---------------- end');
}catch(e){
	console.log(e);
}

```

- fs.open(path, flags, [mode], [callback(err, fd)])

`path`文件路径

`flags`的值为如下：
- `r`以读取模式打开文件
- `r+`以读写模式打开文件
- `w`以写入模式打开文件，如果文件不存在就创建文件
- `w+`以读写模式打开文件，如果文件不存在就创建文件
- `a`以追加模式打开文件，如果文件不存在就创建文件
- `a+`以读取追加模式打开文件，如果文件不存在就创建文件

`mode`用于创建文件时给文件指定权限
`fd`表示操作系统内核为当前进程所维护的打开文件的记录表索引

- fs.read(fd, buffer, offset, length, position, [callback(err, bytesRead, buffer)]):从指定的文件描述fd中读取数据并写入

fd:指定的文件描述
offset是buffer的写入偏量值
buffer是指向的缓存区域
length是读取的字节数
position是文件读取的起始数，如果为null，则从当前文件指针读取
回调函数传递err, bytesRead和buffer，分别标识err,读取的字节数和缓冲区对象

```
var fs = require('fs');

fs.open('file.txt', 'r', function(err, fd){
	if (err){
		console.log('open error' + err);
		return;
	} else {
		console.log('this is fd: ' + fd);
	}

	var buf = new Buffer(8);
	fs.read(fd, buf, 0, 8, null, function(err, byteRead, buffer){
		if(err){
			console.log('read error ' + err);
			return ;
		} else {
			console.log('this is byteRead: ' + byteRead);
			console.log('this is buffer:' + buffer);
			console.log('this is buf:' + buf);
		}
	})
});
```

**HTTP服务器**

概念：node.js提供了http的模块，封装了http服务器和http客户端
http.server基于事件的http服务器
http.request是一个http客户端工具

一、HTTP服务器
1.http.server的事件：http.server是一个基于事件的HTTP服务器，所有请求都被封装到独立的事件，开发者只要对它的事件编写相应函数就可以实现http服务器的所有功能，它继承于EventgEmitter，提供了以下事件
 request当客户请求到来时，该事件被处罚，提供两个参数req和res，分别是http.serverRequest和http.serverResponse的实例，表示请求和响应信息
connection：当TCP连接建立是，该事件被触发，提供一个参数socket，为net.scoket的实例
close：当服务器关闭时，该事件被触发

```
//引入模块
var http = require('http');
//创建服务
var server = http.createServer(function(req, res){
	console.log(req.url);
	//响应头
	res.writeHead(200, {'Content-Type': 'text/html'});
	//响应内容
	res.write('<p>This is http server</p>');
	//结束响应
	res.end('anchor is mili');
});
//监听服务
server.listen(3000);
//监听connection
server.on('connection', function(){
	console.log('connection is be used');
});

//监听close
server.on('close', function(){
	console.log('server is be closed');
});

server.close();

console.log('server is using');
```

- 获取get请求内容：
使用parse函数
```
//引入模块
var http = require('http');
var url = require('url');
var util = require('util');

http.createServer(function(req, res){
	res.writeHead('200', {'Content-Type': 'text/plain'});
	//将get请求中的url拆分
	res.end(util.inspect(url.parse(req.url, true)));//为true时：query: { name: 'mili', age: '22' }，为false时：query: 'name=mili&age=22',
}).listen(3000);
```

- 获取post请求内容

```
var http = require('http');
var querystring = require('querystring');
var util = require('util');

http.createServer(function(req, res){
	var post = '';
	//注册data事件监听函数
	req.on('data', function(chunk){
		post += chunk;
	});

	req.on('end', function(){
		//解析成post格式
		post = querystring.parse(post);
		//向前端返回
		res.end(util.inspect(post));
	});
}).listen(3000);
```

- response

提供三个方法：
`res.writeHead(statusCode, [headers])`写入响应头，状态码200，表示成功，404表示未找到
`res.write(data, [encoding])`响应内容
`res.end([data], [encoding])`结束响应，必须被调用一次

**HTTP客户端**

一、http模块提供了两个函数`http.request`和`http.get`，功能是作为客户端向HTTP服务器发起请求

1.`http.request(options, callback)`发起http请求，接受两个参数，option是一个类似关联数组的对象，表示请求的参数，callback是请求的回调函数，option常用的参数：
- host:域名或IP地址
- port:端口，默认是80
- method：get/post
- path：请求路径，默认是‘/’,
- headers:请求头的内容
- callback：传递一个参数，为http.ClientResponse的实例

```
var http = require('http');
var querystring = require('querystring');

http.createServer(function(req, res){
	console.log('请求到来，解析参数');
	var post = "";
	req.on('data', function(chunk){
		post += chunk;
		console.log(chunk + '-------------');
	});
	req.on('end', function(){
		console.log('old post is ' + post)
		post = querystring.parse(post);
		console.log('new post is ' + post)
		console.log('参数解析完成，返回name参数');
		res.end(post.name + '----ddddddd');
	});
}).listen(3000);

var contents = querystring.stringify({
	name: 'mili',
	age: 22,
	address: 'beijing'
});
//声明请求参数
var options = {
	host: 'localhost',
	path: '/',
	port: 3000,
	method: 'POST',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': contents.length
	}
};
//发送请求
var req = http.request(options, function(res){
	res.setEncoding('utf-8');
	res.on('data', function(data){
		console.log('后台返回数据');
		console.log(data);
	});
});

req.write(contents);
//必须调用end
req.end();
```

2.`http.get(options, callback)`用于处理get请求，是`http.request()`的简化版，不需要手动调用end方法

```
var http = require('http');
var url = require('url');
var util = require('util');

http.createServer(function(req, res){
	console.log('请求到来，解析参数');
	var params = url.parse(req.url, true);
	console.log('解析完成');
	console.log(util.inspect(params));
	console.log('向客户端返回');
	res.end(params.query.name);
}).listen(3000);

http.get({
	host: 'localhost',
	path: '/user?name=mili&age=22',
	port: 3000
}, function(res){
	res.setEncoding('utf-8');
	res.on('data', function(data){
		console.log('服务器响应返回的数据' + data);
	});
});
```

3.request的其他方法：
`request.abort()`终止正在发送的请求
`request.setTimeout(timeout, [callback])`设置请求超时时间

4.`http.ClientResponse`
三个事件，`data`/`end`/`close`
函数：`response.setEncoding([encoding])`
    `response.pause()`:暂停接收数据和发送事件，方便实现下载功能
    `response.resume()`:把暂停的状态恢复


