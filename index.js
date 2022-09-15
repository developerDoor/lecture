const express = require('express');
const app = express();
const morgan = require('morgan');


let users = [
    {id: 1, name: 'moon'},
    {id: 2, name: 'kim'},
    {id: 3, name: 'lee'},
    {id: 4, name: 'park'}
];

app.use(morgan('dev'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//라우팅 설정
app.get('/users', function (req, res) { // HTTP의 req, res 객체가 아닌 그것을 한번 래핑한 express의 req, res 객체이다.
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10);
    if (Number.isNaN(limit)) {
        return res.status(400).end()
    }
    res.json(users.slice(0, limit));
});

app.get('/users/:id', function (req, res) {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const user = users.filter((user) => user.id === id)[0];
    if (!user) return res.status(404).end();
    res.json(user);
});

app.delete('/users/:id', (req, res) =>{
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    users = users.filter(user=> user.id !== id);
    res.status(204).end();
})

app.post('/users', (req, res) =>{
    const name = req.body.name;
    if(!name) return res.status(400).end();

    const isConflic = users.filter(user => user.name === name).length
    if (isConflic) return res.status(409).end();

    const id = Date.now();
    const user = {id, name};
    users.push(user);
    res.status(201).json(user)
});



app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

module.exports = app;