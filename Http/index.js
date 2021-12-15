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
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10);
    if(Number.isNaN(limit)){
       return res.status(400).end();
    }
    res.json(users.slice(0, limit));
})

app.get('/user/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if(Number.isNaN(id)){
        return res.status(400).end();
    }

    const user = users.filter((item) => {
        return item.id === id;
    })[0];

    if(!user) {
        return res.status(404).end();
    }

    res.json(user);
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
})

module.exports = app;