// 라우팅 설정 로직
const express = require('express');
const router = express.Router();
const ctrl = require('./user.ctrl');

router.get('/', ctrl.findAll);

router.get('/:id', ctrl.findById );

router.delete('/:id',ctrl.deleteById );

router.post('/', ctrl.save);

router.put('/:id',ctrl.updateById );

module.exports = router;