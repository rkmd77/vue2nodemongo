//模拟客户端请求，来调用第三方服务（接口）读取动态资源

let http = require('http');
let util = require('util');	//可以对输出结果进行调试

http.get('http://imooc.51purse.com/users/checkLogin', function(res){	//http.get方法来加载第三方接口
	let resdata = '';	//用来接收返回结果
	res.on("data", function(chunk){		//监听数据变化
		resdata += chunk;		//并不能一次接受所有数据，需要有一个过程，所以用++
	});

	res.on("end", function(){	//end接受完毕
		let result = JSON.parse(resdata);	//接收到的数据resdata是字符串，需要转成object
		console.log("result-->: " + result.msg);	//接收到的对象要传给前端处理，这里没有前端，只是打印出来测试一下
		console.log("status-->: " + result.status);

		console.log("util-->: " + util.inspect(result));	//使用util.inspect得到返回结果的完整信息，可以方便调试
	});
});