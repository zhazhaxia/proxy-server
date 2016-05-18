//基本的http服务器
var http = require('http'),
	fs = require('fs'),
	url = require('url');


var httpServer = http.createServer(function(req, res){
	var b_url = url.parse(req.url),//格式化url路径
		b_pathname = b_url.pathname;
	console.log(b_pathname);

	if (b_pathname == '/') {b_pathname = '/index.html';}
	fs.readFile(b_pathname.substr(1), function(err,data){
		if (err) {
			res.writeHead(404,{'content-type':'text/html'});//文件不存在
			res.write('404 not found');
		}else {
			res.writeHead(200,{'content-type' : 'text/html'});
			res.write(data.toString());
		}
		res.end();
	});

});
httpServer.listen(3000);
console.log('server is running http://127.0.0.1:3000/');