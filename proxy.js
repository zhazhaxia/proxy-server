//使用request模块 npm install request

//浏览器设置代理为本机http://127.0.0.1:3000/  采用supervisor模块重启
//https网站不起作用
var http = require('http'),
	url = require('url'),
	request = require('request'),
	fs = require('fs');

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

	var rule = b_url.hostname+b_url.pathname,
		method = req.method;
	// console.log(rule);

	// console.log(req.method)

	if(!b_url.hostname) notFound(res);

	if (method === 'GET') {
		request.get(req.url).on('response',function(p_res){//发起代理请求
			var data = "",
				rd = matchRule(rule);
			if (rd) {
				p_res.headers['Transfer-Encoding'] = 'chunked';
				res.writeHead(p_res.statusCode, p_res.headers);
				res.write(rd);
				res.end();
			}else {
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
		}).on('error', function(err) {
			
			console.log(err);
		});
	}

	//处理post请求
	if (method == "POST") {
		console.log(req.url)
		var data = "";
		req.on('data', function(chunk) {
			
			data += chunk;
		}).on('end', function() {
			data = data.toString();//a=**&b=***;
			data = postaDataToJson(data);

			// console.log(data)

			request.post(req.url).form(data).on('response', function(p_res) {
				
				var data = "";
				res.writeHead(p_res.statusCode, p_res.headers);
				p_res.addListener('data', function(chunk){
					data += chunk;
					res.write(chunk);
				});

				p_res.addListener('end',function(){
					console.log(data);
					res.end();
				});
			});
		});
	}
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
function postaDataToJson(data){
	var json = {},tmp=[];
	data = data.split('&');
	for (var i = data.length - 1; i >= 0; i--) {
		tmp = data[i].split('=');
		json[tmp[0]] = tmp[1];
	}
	return json;
}