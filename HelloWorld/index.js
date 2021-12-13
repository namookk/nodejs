const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    //routing
    const requestUrl = req.url;

    if(requestUrl === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World\n');
    }else if(requestUrl === '/users') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('User list');
    }else{
        res.statusCode = 404;
        res.end('Not Found');
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});

//terminal1
// node HelloWorld/index.js
// Server running at http://127.0.0.1:3000

//terminal2
// curl -X GET 'localhost:3000'
// Hello World