const express = require('express');
const path = require('path'); // 경로 모듈
const morgan = require('morgan');


const app = express();

app.set('port', process.env.PORT || 3000); // 서버에다가 속성을 심는다. 전역변수 같은 느낌

app.use(morgan('dev'));



// get은 HTTP Method이고, '/'은 url이다. 즉 req의 method와 req url이다.
// 더이상 if문을 갈기지 않아도 된다. app에다가 method를 붙여주는 방식으로 구분이 가능하다.
// app.use((req, res, next) => {
//     console.log('모든 요청에 실행하고 싶어요!');
//     next();
// });

// next()에 인수가 있으면 예를들어 next(error)라면 다음 미들웨어로 넘어가는게 아니라 에러처리 미들웨어로 바로 보내버린다. 인수가 없다면 그다음 미들웨어로 간다.
// app.use((req, res, next) => {
//     console.log('next() 사용법 한번 볼래?');
//     next();
// }, (req, res, next) => {
//     try {
//         console.log(asfdsb);
//     } catch (error) {
//         next(error);
//     }
// })

// next('route') 설명
// app.get('/', (req, res, next) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
//     if (true) {
//         next('route'); // 같은 라우터의 다른 미들웨어를 실행시키는 것이 아닌 다음 라우터로 일단 넘어간다.
//     } else {
//         next();
//     }
// }, (req, res) => {
//     console.log('이게 실행될까요?');
// });
//
// app.get('/', (req, res) => {
//     console.log('이게 실행되지롱~'); // 그래서 이친구가 실행된다.
// });


// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
//     res.send('안녕하세요!'); // 한 미들웨어 안에서 send 두번 안된다. 요천 한번에 응답도 한번!!!!!
//     res.json({ hello : 'moonga' }); // 이 경우에는 응답을 세번 보내려고 한다!
//     res.writeHead(200, {}) // 이미 응답보냈는데 head는 왜 쓰냐??
// });

// app.get('/', (req, res) => {
//     res.json({ hello : 'moon' }); // 아래 console.log 함수가 실행이 안된다고 생각하는 사람이 있는데 res.json은 return이 아니므로 함수가 종료되지 않는다!
//     console.log('hello moon');
// })


// // HTTP -> express
// app.get('/', (req, res) => {
//     res.writeHead(200, { 'Content-Type' : 'application/json' });
//     res.end(JSON.stringify({ hello : 'moon'}));
//
//     res.json({ hello : 'moon'}); // 위 코드 두줄을 express에서 이렇게 줄여준 것
// })


app.post('/', (req, res) => {
    res.send('hello express');
});

app.get('/category/Javascript', (req, res) => {
    res.send('hello Javascript');
});

app.get('/category/:name', (req, res) => { // 와일드 카드, 라우트 매개변수 | 와일드카드는 다른 미들웨어들보다 아래에 있어야한다.
    res.send(`hello ${req.params.name}`);
});

app.get('/about', (req, res) => {
    res.send('hello express');
});

// app.get('*', (req, res) => { // 모둔 get요청 다 받는다.
//     res.send(`hello everybody`);
// });

// 라우터들 밑에, 에러처리 미들웨어보다는 위에 하면 404처리 미들웨어가 된다. 근데 에러는 아님 because 라우터들 다 거쳤는데 안떴다? => 404!!
// 서버쪽에 404여도 브라우저한테 200이라고 뻥칠 수 있음
app.use((req, res, next) => {
    res.status(404).send('404입니다.');
});

// 에러 미들웨어, 에러 미들웨어는 반드시 매개변수 4개 다 써줘야한다.
app.use((err, req, res, next) => {
    console.error(err);
    res.status(200).send('에러났지롱. 근데 안알려주지롱~~~');
})

app.listen(app.get('port'), () => {
    console.log('익스프레서 서버 실행');
});
