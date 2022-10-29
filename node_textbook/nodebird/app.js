// 패키지들 가져온다.
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');

dotenv.config(); // dotenv는 require한 다음에 항상 최상단에 해주는게 좋다.
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const { sequelize } = require('./models');

const app = express();
app.set('port', process.env.PORT || 8001); // 개발과 배포 포트를 다르게 하기위함.
app.set('view engine', 'html'); // 넌적스 설정
nunjucks.configure('views', {
    express: app,
    watch: true,
});
sequelize.sync({ force: false }) // 실무에서 true 쓰는 일은 없도록 하자.
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    })

// 6장에서 복습 가능!!
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));

// 이 둘은 express session보다 아래에 위치해야한다.
app.use(passport.initialize());
app.use(passport.session());

app.use('/', pageRouter);
app.use('/auth', authRouter);

// 모든 라우터 뒤에 나오는 것, 모든 라우터를 거쳤는데 없다는 거니까 요청이 등록이 안되어 있는 것
app.use((req, res, next) => {
    const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

// 에러 미들웨어 : 인자가 4개, 마지막 next는 안쓰더라도 생략하면 안된다.
app.use((err, req, res, next) => {
    res.locals.message = err.message; // 템플릿 엔진의 변수
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; // 개발일때만 stack tracer 볼 수 있도록
    res.status(err.status || 500).render('error'); // 메서드 체이닝도 가능함
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});
