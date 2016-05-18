//获取文件每行数据，存进数组
var fs = require('fs');

fs.readFile('rule.txt', function(err, data){
	if (err) {console.log(err);return;}

	var data = data.toString();

	data = data.split(/\n|\r/g).trimNull();
	console.log(data);
});



/*
数组空，或者字符串前面是‘//’注释的就不要
*/
Array.prototype.trimNull = function(){
	var tmp = [];
	for (var i = 0; i < this.length; i++) {
		if (this[i] !== "" && this[i].slice(0,2) != '\/\/') {tmp.push(this[i].trim());}
	}
	return tmp;
}