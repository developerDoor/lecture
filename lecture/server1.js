const http = require('http');

const server = http.createServer((req,res) => {
    res.writeHead(200, { 'content-Type' : 'text/html; charset=utf-8'});
    res.write('<h1>Hello Node!</h1>');
    res.write('<p>Hello server</p>');
    res.end('<p>hello zerocho</p>');
})
    .listen(8080); //

server.on('listening', () => {
    console.log('8080 포트에서 서버가 대기중입니다.');
});
server.on('error', (error) => {
    console.log(error);
})