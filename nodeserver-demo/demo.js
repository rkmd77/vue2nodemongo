//这里演示的是基于node的运行在服务器上的语言，所以require是node自带的， es6语法可以直接使用而不需要编译

let user = require('./User.js');

console.log(`userName: ${user.userName}`);

console.log(`SAY: ${user.sayHello()}`);

//运行的话，切换到当前目录，执行 node demo.js 就可以

console.log(`userName: ${user.userName2}`);

console.log(`SAY: ${user.sayHello2()}`);