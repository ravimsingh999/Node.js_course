const http=require('http');
const fs=require('fs');
const server=http.createServer((req,res)=>{
    //console.log(req.url,req.method,req.headers);
    res.setHeader('Content-Type','text/html');
    const url=req.url;
    const method=req.method;
    const addd="hello";
    console.log(req.url,req.method);
    if(url==='/')
    {
        res.write('<html>');
        res.write('<head><title>Node.js course</title></head>');
        res.write('<body><form action="/message" method="POST"><input name="message"><button>click me</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if(url==='/message' && method==='POST')
    {
        const body=[];
        req.on('data',(chunk)=>{
            body.push(chunk);
        });
        req.on('end',()=>{
            const parsebody=Buffer.concat(body).toString();
            const messeage=parsebody.split('=')[1];
            fs.writeFileSync('message.txt',messeage);
        })
        res.statusCode=302;
        res.setHeader('Location','/');
        return res.end();
    }
    res.write('<html>');
    res.write('<head><title>Node.js course</title></head>');
    res.write('<body>hii , this is response from the server !!!!</body>');
    res.write('</html>');
    res.end();
})
server.listen(3000);