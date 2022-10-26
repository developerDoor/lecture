const http = require('http');
http.createServer(function (request, response) {
    response.writeHead(200, {
        'Set-Cookie' : ['yummy_cookie=choco', 'tasty-cookie=strawberry']
    });
    response.end('Cookie!!');
}).listen(3000);
