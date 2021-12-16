// api 로직
const models = require('./user.models');


const findAll = (req, res) => {
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10);
    if(Number.isNaN(limit)){
        return res.status(400).end();
    }

    //db에서 데이터 조회
    models.User.findAll({
        limit : limit
    }).then(users => {
        res.json(users);
    })
};

const findById = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if(Number.isNaN(id)){
        return res.status(400).end();
    }
    models.User.findOne({
        where : {
            id : id
        }
    }).then(user => {
        if(!user) return res.status(404).end();
        res.json(user);
    })
};

const deleteById = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if(Number.isNaN(id))  return res.status(400).end();

    models.User.destroy({
        where : {id}
    }).then(() => {
        res.status(204).end();
    })
};

const save = (req, res) => {
    const name = req.body.name;

    if(!name) return res.status(400).end();
    //if(arr.length > 0) return res.status(409).end();

    models.User.create({name})
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            if(err.name === 'SequelizeUniqueConstraintError') return res.status(409).end();
            res.status(500).end();
        })
};

const updateById = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const name = req.body.name;
    if(Number.isNaN(id)) return res.status(400).end();
    if(!name) return res.status(400).end();

    models.User.findOne({where : {id}})
        .then(user => {
            if(!user) return res.status(404).end();

            user.name = name;
            user.save()
                .then(u =>{
                    res.json(u);
                })
                .catch(err => {
                    if(err.name === 'SequelizeUniqueConstraintError') return res.status(409).end();
                })
        })
};

module.exports = { findAll, findById, deleteById, save, updateById}