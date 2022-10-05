const express = require('express');
const morgan = require('morgan');
const app = express(); // app 변수가 어플리케이션이다.


//// middleware는 인터페이스가 정해져있다.
// function logger(req, res, next) {
//     console.log('i am logger');
//     next(); //next 함수를 호출해야만이 다음 로직을 수행할 수 있다. 반드시 호출해야 한다.
// }
//
// function logger2(req, res, next) {
//     console.log('i am logger2');
//     next();
// }
//
// app.use(logger);
// app.use(logger2);
// app.use(morgan('dev'));

// 위 미들웨어들은 일반 미들웨어이다.
// 일반 미들웨어는 파라미터를 3개 받는다.

function commonmw(req, res, next) {
    console.log('commonmw');
    next(new Error('error occered!'));
}

// 에러 미들웨어는 파라미터가 4개이다.
function errormw(err, req, res, next) {
    console.log(err.message);
    // 에러를 처리하거나
    next();
    // 에러를 처리하지 못했으면 다음 미들웨어한테 넘겨준다
    //next(err);
}

app.use(commonmw);
app.use(errormw);




app.listen(3000, () => {
    console.log('Server is running');
})
