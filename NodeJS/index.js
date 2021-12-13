// const http = require('http');
// http.createServer();

// const math = require('./math.js');
// const result = math.sum(1,2);

// console.log(result);

const fs = require('fs');
//const data = fs.readFileSync('/nodejs-basic/data.txt', 'utf8'); // sync
const data = fs.readFile('./data.txt', 'utf8', function(err, data){ // async
    console.log(data);
});
