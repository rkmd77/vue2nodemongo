let http = require('http');

let server = http.createServer((req, res)=>{
	res.statusCode = 200;

	res.setHeader("Content-Type","text/plain; chartset=utf-8");

	res.end("Hello node.js server");
})

	.listen(3333, '127.0.0.1', ()=>{
		console.log("server started, please use --  http://127.0.0.1:3333  -- to open");
	});
