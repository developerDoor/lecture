const express = require('express');

const router = express.Router();

// 팔로워, 팔로잉 구현할 때 사용하는 부분
router.use((req, res, next) => {
    res.locals.user = null;
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
    res.locals.followerIdList = [];
    next();
});

router.get('/profile', (req, res) => {
    res.render('profile', { title: '내 정보 - NodeBird' });
});

router.get('/join', (req, res) => {
    res.render('join', { title: '회원가입 - NodeBird' });
});

router.get('/', (req, res, next) => {
    const twits = []; // 메인 게시물 들어가는 공간
    res.render('main', {
        title: 'NodeBird',
        twits,
    });
});

module.exports = router;
