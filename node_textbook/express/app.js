const express = require('express');

const app = express();
app.set('port', process.env.PORT || 3000); // 서버에다가 속성을 심는다. 전역변수 같은 느낌
// get은 HTTP Method이고, '/'은 url이다. 즉 req의 method와 req url이다.
// 더이상 if문을 갈기지 않아도 된다. app에다가 method를 붙여주는 방식으로 구분이 가능하다.
app.get('/', (req, res) => {
    res.send('hello express');
});

app.post('/', (req, res) => {
    res.send('hello express');
});

app.get('/about', (req, res) => {
    res.send('hello express');
});

app.listen(3000, () => {
    console.log('익스프레서 서버 실행');
});
