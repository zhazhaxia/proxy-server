# proxy-server

# 基于node.js的代理服务器

##怎么使用？
>需要安装两个模块   
一个是supervisor，用于启动proxy.js  
一个是request，用来请求http资源   

>然后在浏览器设置代理127.0.0.1:3000   
启动代理服务器 `supervisor proxy.js`    


本系统以y.qq.com为例，代理其中的一个cdn_djl.js文件   
在rule.txt下设置规则，不用的规则注释掉，规则示例：    
>jsqmt.qq.com/cdn_djl.js ./cdn_djl.js   
// ctc.qzonestyle.gtimg.cn/utp/dnsgetForMusic.js dnsgetForMusic.js    

前面是规则匹配线上的文件，后边是线下的代理文件      
当修改了本地代理文件后，y.qq.com就会执行本地代理文件

** 当然，本代理服务器还很多缺点，这边作为演示。比如还不支持https，不支持文件上传的代理，才疏学浅，还没有找到方法解决。希望提供优化建议 **

