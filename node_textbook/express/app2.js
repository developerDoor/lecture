const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const multer = require('multer');
const fs = require('fs');

const dotenv = require('dotenv');
dotenv.config();

const indexRouter = require('./routes');
const userRouter = require('./routes/user')

const app = express()

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET ,
    cookie: {
        httpOnly: true, // httpOnly를 해야지 쿠키에 js로 접근을 할 수 없기때문에!
    },
    name: 'connect.sid',
}));
app.use('/', indexRouter)
app.use('/user', userRouter);

try {
    fs.readdirSync('uploads'); // 서버코드에는 sync 코드 쓰지말라고 했는데 여기는 써도 된다. 서버 시작전이기 때문.
} catch (error) {
    console.log('upload 폴더가 없어 upload 폴더를 생성합니다.');
    fs.mkdirSync('upload');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads/'); // 첫번째 인수는 주로 null, 첫번째 인수를 사용하는 경우는 error가 났을 때 error를 error처리 미들웨어로 넘길 때 사용한다. 두번째 인수는 성공했을 때 값을 넣어준다.
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname); // 확장자 추출하기
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: {fileSize: 5 * 1024 * 1024},
});

app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'multipart.html'));
});
app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file);
    res.send('ok');
});




//app.use('요청경로', express.static(path.join('실제경로')));
app.use('/', express.static(path.join(__dirname, 'public'))); // static은 파일을  찾으면 내부적으로 next를 실행하지 않는다.


// body parser 추가 부분
// 기존에 http에서 body를 stream 형식으로 받아내야 했던것을 알아서 데이터가 파싱되서 들어온다.
app.use(express.json()); // 클라이언트에서 json 데이터를 보냈을 때 그 json 데이터를 파싱해서 req.body에 담아준다.
app.use(express.urlencoded({ extended : true })); // 클라이언트에서 form데이터를 보냈을 때 form을 파싱해준다. extended true면 qs, false면 querystring 사용

app.get('/', (req, res, next) => {
    req.body.name
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/', (req, res, next) => {
    req.session.id = 'hello'; // 사용자 아이디 같은거 넣어줄 필요가 없다. 이 자체로 고유한 세션 값이다. 아이디를 넣어준다면 모든 세선의 아이디 값이 hello가 되는게 아니라 요청을 보내는 그 사용자만 hello가 된다.
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', (req, res) => {
    res.send('hello express!');
});

app.get('/category/Javascript', (req, res) => {
    res.send('hello Javascript');
});


app.get('/', (req, res, next) => {
    req.cookies // { mycookie : 'test }
    req.signedCookies // 서명된 쿠키
    // 'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`
    res.cookie('name', encodeURIComponent(name), {
        expires : new Date(),
        httpOnly : true,
        path : '/',
    })
    res.clearCookie('name', encodeURIComponent(name), {
        httpOnly : true,
        path : '/',
    })
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', (req, res) => {
    res.send('hello express!');
});

app.get('/category/Javascript', (req, res) => {
    res.send('hello Javascript');
});

app.get('/category/:name', (req, res) => {
    res.send('hello wildcard');
});

app.get('/about', (req, res) => {
    res.send('hello express');
});

app.use((req, res, next) => {
    res.status(404).send('404지롱');
});

app.use((err, req, res, next) => {
   console.error(err);
   res.status(200).send('에런데 안알랴줌');
});

app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행');
});