//通用方法（导出一个对象）
module.exports = {
	userName: "Jack",
	sayHello: function(){
		return 'Hello--';
	}
}

//另一种写法（直接导出对象的key）
exports.userName2 = "Tom";
exports.sayHello2 = function (){
	return "world!!!";
}