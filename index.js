// root폴더에 있는 index 파일은 express 설정하는 부분과 express 서버를 돌려주는 부분 두가지로 구분된다.
const express = require('express');
const app = express();
const morgan = require('morgan');
const user = require('./api/user/index.js')

if(process.env.NODE_ENV !== 'test'){
    app.use(morgan('dev')); // 테스트 환경에서는 이 MW가 동작 안하니까 로그가 찍히지 않은다.
}

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/users', user); // '/users' 위 경로로 들어오는 모든 API 요청에 대해서는 user모듈이 담당한다.

module.exports = app;