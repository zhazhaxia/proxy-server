//浏览器设置代理为本机http://127.0.0.1:3000/  采用supervisor模块重启
//https网站不起作用
var http = require('http'),
	url = require('url');
var fs = require('fs');

//获取匹配规则
var ruleFileData = fs.readFileSync('rule.txt').toString()//.split(/\n|\r/g).trimNull();
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
ruleFileData = ruleFileData.split(/\n|\r/g).trimNull();
// console.log(ruleFileData);

function notFound (res) {
	res.writeHead(404, 'text/plain');
	res.end('404 not found');
}
function serverCallback(req, res){
	var b_url = url.parse(req.url,true);//获取请求的http url信息并格式化

	var rule = b_url.hostname+b_url.pathname
	console.log(rule);
	if(!b_url.hostname) notFound(res);

	//发起代理服务器的http请求
	var p_req = http.request({
		host:b_url.hostname,
		port:b_url.port || 80,
		path:b_url.pathname

	},function(p_res){
		var data="";
		//console.log(p_res.headers)
		

		var rd = matchRule(rule);
		if(rd){//console.log(rd)
			p_res.headers['Transfer-Encoding'] = 'chunked';
			res.writeHead(p_res.statusCode, p_res.headers);
			res.write(rd);
			res.end();
		}else {
			// res.write(data);
			res.writeHead(p_res.statusCode, p_res.headers);
			p_res.addListener('data', function(chunk){
				data += chunk;
				res.write(chunk);
			});

			p_res.addListener('end',function(){
				
				//console.log(data);
				res.end();
			});
		}
		
		
	});
	p_req.end();
}
var http_server = http.createServer(serverCallback);
http_server.listen(3000);
// console.log('server running http://127.0.0.1:3000/');

function matchRule(rule){
	//return 0;
	//获取文件每行数据，存进数组
	for (var i = 0; i < ruleFileData.length; i++) {
		var mr = ruleFileData[i].split(/\s+/g),
			tmpData = "";

		if(mr[0].trim() == rule){
			tmpData = fs.readFileSync(mr[1]).toString();
			return tmpData;
			break;
		}
		
	}
	return 0;
}
