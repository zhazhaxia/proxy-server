var http = require('http'),
	sys = require('sys'),
	url = require('url');

var http_server = http.createServer(function(req,res){
	//代理重定向http://127.0.0.1:3000?url=http://qq.com
	//

	//console.log(req.url);
	
	// res.writeHead(200,'text/plain');
	// res.end('hello world');

	var b_url = url.parse(req.url,true);
	//console.log(b_url)
	if (!b_url.query || !b_url.query.url) {return notFound(res);}

	//获取http://qq.com
	var p_url = url.parse(b_url.query.url);

	console.log(p_url)


	//创建http代理客户端，发起请求,这种方法已经被废弃，采用方法2
	//var p_client = http.createClient(p_url.port || 80,p_url.hostname);
	// var p_req = http.request('GET',p_url.pathname || '/', {
	// 	host:p_url.hostname
	// });
	// p_req.addListener('response', function(p_res){

	// 	res.writeHead(p_res.statusCode, p_res.headers);

	// 	p_req.addListener('data', function(chunk){
	// 		res.write(chunk);
	// 	});

	// 	p_req.addListener('end',function(){
	// 		res.end();	
	// 	});
	// })

	//请求2，发起服务器短的http请求
	var p_req = http.request({
		host:p_url.hostname,
		port:p_url.port || 80,
		path:p_url.pathname

	},function(p_res){
		var data="";

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
	

});
http_server.listen(3000);

sys.puts('server running http://127.0.0.1:3000/');

function notFound (res) {
	res.writeHead(404, 'text/plain');
	res.end('404:file not found');
}