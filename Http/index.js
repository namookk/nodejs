// GET /users 만들기

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const user = require('../Router/user/index');

let users = [
    {
        id : 1,
        name : 'namwook'
    },
    {
        id : 2,
        name : 'namwook2'
    },
    {
        id : 3,
        name : 'namwook3'
    }
]

if(process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/users', user);

// app.listen(3000, () => {
//     console.log('Example app listening on port 3000!');
// })

module.exports = app;