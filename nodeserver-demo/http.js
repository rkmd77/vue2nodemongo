let http = require('http');
let url = require('url');
let util = require('util');

let server = http.createServer((req, res)=>{
	res.statusCode = 200;

	res.setHeader("Content-Type","text/plain; chartset=utf-8");

	//res.end("Hello node.js server");
	
	//url.parse((req.url));
	console.log("url--> " +req.url);	//这里所有的console.log都只会在服务器端输出而非浏览器
	//res.end(url.parse((req.url)));
	console.log("parse--> " +url.parse(req.url));
	//util.inspect(url.parse((req.url));
	console.log("inspect--> " +util.inspect(url.parse((req.url))));

	res.end(util.inspect(url.parse((req.url))));
})

	.listen(3333, '127.0.0.1', ()=>{
		console.log("server started, please use --  http://127.0.0.1:3333  -- to open");
	});
