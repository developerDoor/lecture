//라우팅 설정 로직이 들어간다.
const express = require('express');
const router = express.Router(); // Router 클래스를 활용
const ctrl = require('./user.ctrl')

//라우팅 설정
router.get('/', ctrl.index); //
router.get('/:id', ctrl.show);
router.delete('/:id', ctrl.destroy);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);

module.exports = router;