//浏览器设置代理为本机http://127.0.0.1:3000/  采用supervisor模块重启
//https网站不起作用
var http = require('http'),
	url = require('url');
function notFound (res) {
	res.writeHead(404, 'text/plain');
	res.end('404 not found');
}
function serverCallback(req, res){
	var b_url = url.parse(req.url,true);
	console.log(b_url.hostname+b_url.pathname);
	if(!b_url.hostname) notFound(res);
	//发起代理服务器的http请求
	var p_req = http.request({
		host:b_url.hostname,
		port:b_url.port || 80,
		path:b_url.pathname

	},function(p_res){
		var data="";
		console.log(p_res.headers)
		res.writeHead(p_res.statusCode, p_res.headers);

		p_res.addListener('data', function(chunk){
			data += chunk;
			res.write(chunk);
		});

		p_res.addListener('end',function(){
			//res.write(data);
			//console.log(data);
			res.end();	
		});
	});
	p_req.end();
}
var http_server = http.createServer(serverCallback);
http_server.listen(3000);
console.log('server running http://127.0.0.1:3000/');