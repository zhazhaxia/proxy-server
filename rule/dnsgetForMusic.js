(function(huatuoChk){
	var cookieName = 'ht_ldns_ip_o';
	var dns_domain  = '';
	var dns_ip = '';
	var top_domain = '';
	var chkNum = 0;
	var rdn = 1;
	var chkData = {};
	var isMobile  = false;
	var huatuokey = '';
	//music
	function reportChkData(){
	
	if(chkNum > 0){
		setTimeout(reportChkData, 2000);
		return true;
	}
	var uin = 0;
            try {
                uin = getUin();
            } catch (err) {}
	
	var isdspeedUrl = htuoUrl = '';
	//delete isdspeed 
	//isdspeedUrl = 'http://c.isdspeed.qq.com/code.cgi?uin='+ uin + '&key=domain,cgi,type,code,time,rate';
	htuoUrl      = '/c2.fcg?cgi=/cgi-bin/huatuo_get_host&key=domain,type,code,time,clientip,localdns,huatuokey';
	var num = 1;
	var domainData;
	for(var i in chkData){
		domainData = chkData[i];
		
			htuoUrl += '&'+num+'_1='+domainData.cgiHost+'&'+num+'_2='+domainData.type+'&'+num+'_3='+domainData.code+'&'+num+'_4='+domainData.utime+'&'+num+'_5='+domainData.clientIp+'&'+num+'_6='+dns_ip+'&'+num+'_7='+huatuokey;
			
			//isdspeedUrl+="&"+num+"_1="+domainData.cgiHost+"&"+num+"_2=/cgi-bin/huatuo_get_host&"+num+"_3=" + domainData.type + "&"+num+"_4=" + domainData.code + "&"+num+"_5=" + domainData.utime + "&"+num+"_6=1";
			num++
	}
	

  //getScript(isdspeedUrl, function() {});
			
			
	window.huatuo_report_result = false;
	var reportDomain = ['sngspeed.qq.com','cn.sngspeed.qq.com','ctc.sngspeed.qq.com','cnc.sngspeed.qq.com','cm.sngspeed.qq.com','sngspeed.weiyun.com','cn.sngspeed.weiyun.com','ctc.sngspeed.weiyun.com','cnc.sngspeed.weiyun.com','cm.sngspeed.weiyun.com'];
	function cb (){
				if(!window.huatuo_report_result){
					doHtR();
				}
	}
			
	function doHtR(){
			
		if(reportDomain.length > 0){
					getScript('http://'+reportDomain.shift()+htuoUrl, cb);
		}
	}
		  
			
	doHtR();
	
	
	}
 function domainClientChk(chkUrl){
	
		
		var urlArr = chkUrl.split("/");
		var cgiHost = urlArr[2];
		var type = 1;
        var code = 0;
        //拨测域名是否OK
        var stime = new Date();
		getScript(chkUrl, function(scriptTag) {
		var etime = new Date();
        var utime = parseInt(etime - scriptTag.stime);
		var chost  = scriptTag.cgiHost;
		
        if (!window.huatuo_user_export_ip || !window.huatuo_user_export_ip[chost]) {
                type = 2;
                code = 1;
				window.huatuo_user_export_ip[chost] = '';
            } else {
                type = 1;
                code = 2;
            }
          

          
			chkNum--;
			
			chkData[chost] = {'type':type,'code':code,'utime':utime,'cgiHost':chost,'clientIp':window.huatuo_user_export_ip[chost]};
					
			return true;
           
		},{'stime':stime,'cgiHost':cgiHost});
	
	};
	var pcDomainList = ['user.qzone.qq.com/cgi-bin/huatuo_get_host'];
	
	
	function afterDns(){
		dns_ip='undefined';
			
			
		var timestamp = Date.parse(new Date()) / 1000 - 1388505600;
		huatuokey = getUin().toString() + timestamp.toString();
		var dlist = [];
		if(isMobile){
			
				
		}else{
				dlist = pcDomainList;
		
		}
		
		
		chkNum = dlist.length;
		window.huatuo_user_export_ip = {};
		while(dlist.length > 0){
		
			 domainClientChk('http://'+dlist.shift()+"?g_tk=" + getACSRFToken() + "&huatuokey=" + huatuokey);
		}
		 
		 setTimeout(reportChkData, 2000);
	}
	
 function report(isM){
	 isMobile = isM;
		try {
			if(random(0,1000) === 3 ) {
				// 调用huatuo API时采用抽样
					getScript("http://qzonestyle.gtimg.cn/utp/htdnsapi.js", function() {
						function getLdns(ldnsIp){
							 dns_ip = ldnsIp;
						}
						htdnsapi.dnsIP("" + getUin(),getLdns);
				 });
			}
		}catch(err) {}
		afterDns();	
	}
	function getACSRFToken(){
	function _DJB(str) {
		var hash = 5381;

		for(var i = 0, len = str.length; i < len; ++i){
			hash += (hash << 5) + str.charCodeAt(i);
		}

		return hash & 0x7fffffff;
	}
	return _DJB(getCookie("skey"));
	};
	
	function getCookie(name) {
	var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*)"), m = document.cookie.match(r);
		return (!m ? "" : m[1]);
	}
	
	function getUin()
	{
		var uin = getCookie("uin");
		var uins = uin.split('o');
		if(uins.length == 2)
			uin = parseInt(uins[1]);
		return uin.toString();
	}

    function random(min,max){
	    return Math.floor(min+Math.random()*(max-min));
    }
	 function doDnsReq(){
		
			var img = document.createElement("IMG");
			if (img) {
				var host = window.location.host
				img.style.display = "none";
				var r1,r2,r3;
				r1 = parseInt(Math.random() * 1000000);
				r2 = parseInt(Math.random() * 100000);
				r3 = parseInt(Math.random() * 100000);
				
				var now = new Date();
				 
				
				 dns_domain = now.getTime()+ '_' + r1 +  "." + r2 +r3+"a.sngdia.imtmp.net";
				img.src = "http://" + dns_domain + '/s';
				document.body.appendChild(img);
				setTimeout(getLdns, 2000);
				}
	}
	
	var  getScript =function(url, callback,opt){
	
	 function scriptLoaded() {
                if (!script.readyState || "|loaded|complete".indexOf(script.readyState) > -1) {
                 
                    script.removeNode ? script.removeNode(true) : head.removeChild(script);
                    head = script = script.onreadystatechange = script.onload = script.onerror = null;
                    callback(this)
                }
            }
          
            var script = document.createElement("script"),
                head = document.getElementsByTagName("head")[0];
		
		script.type="text/javascript";
		script.async = true;
		script.src = url;
		for(var inx in opt)
			script[inx] =opt[inx];
 	
        script.onload = script.onerror = scriptLoaded;
        if(script.onreadystatechange){script.onreadystatechange = scriptLoaded};
            head.appendChild(script)
	
	}
    huatuoChk.report =  report;

})(huatuoCheckApi = {})

huatuoCheckApi.report(false);

