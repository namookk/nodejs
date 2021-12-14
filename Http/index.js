// GET /users 만들기

const express = require('express');
const app = express();
const morgan = require('morgan');
const users = [
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

app.use(morgan('dev'));

app.get('/users', (req, res) => {
    res.json(users);
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
})