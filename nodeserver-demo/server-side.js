//模拟服务端请求，创建一个web容器来
//真正读取index.html 等静态页面，

let http = require('http');
let url = require('url');
let util = require('util');
let fs = require('fs');

let server = http.createServer((req, res)=>{

	var pathname = url.parse(req.url).pathname;		/*/这里使用的是req.url获取参数，这是NodeJS原生的方式/*/
	console.log("file-->"+ pathname.substring(1));

	fs.readFile(pathname.substring(1), function (err, data) {
		if(err) {
			res.writeHead(404, {
				'Content-Type':'text/html'
			});
		}else{
			res.writeHead(200, {
				'Content-Type':'text/html'
			});
			res.write(data.toString());
		}

		res.end();
	});


})

	.listen(3333, '127.0.0.1', ()=>{
		console.log("server started, please use --  http://127.0.0.1:3333  -- to open");
	});
