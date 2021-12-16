// api 로직

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
];

const findAll = (req, res) => {
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10);
    if(Number.isNaN(limit)){
        return res.status(400).end();
    }
    res.json(users.slice(0, limit));
};

const findById = (req, res) => {
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
};

const deleteById = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if(Number.isNaN(id))  return res.status(400).end();
    users = users.filter(user => user.id !== id)
    res.status(204).end();
};

const save = (req, res) => {
    const name = req.body.name;

    if(!name) return res.status(400).end();
    const arr = users.filter(user => user.name === name);
    if(arr.length > 0) return res.status(409).end();

    const id = Date.now();
    const user = {id, name};
    users.push(user);

    res.status(201).json(user);
};

const updateById = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const name = req.body.name;
    if(Number.isNaN(id)) return res.status(400).end();
    if(!name) return res.status(400).end();

    const arr = users.filter(user => user.id === id);
    if(arr.length === 0) return res.status(404).end();

    const arr2 = users.filter(user => user.name === name);
    if(arr2.length > 0) return res.status(409).end();

    let body;
    users.forEach(user => {
        if(user.id == id) {
            user.name = name;
            body = user;
        }
    });

    res.json(body);
};

module.exports = { findAll, findById, deleteById, save, updateById}