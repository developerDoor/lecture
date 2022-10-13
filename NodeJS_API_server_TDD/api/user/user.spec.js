// Test 코드가 들어간다.
const request = require('supertest');
const should = require('should');
const app = require('../../index.js');
const models = require('../../models');

describe('GET /users는', () => {
    const users = [{name: 'alice'}, {name: 'bek'}, {name: 'chris'}];
    before(()=>models.sequelize.sync({force:true})); // mocha에서 자동으로 비동기 처리해준다.
    before(()=> models.User.bulkCreate(users));

    describe('성공시', () => {

        // before(done=>{ //db 싱크는 비동기로 작업하는 일이기 때문에! 왜냐면 파일에 접근하는 일이 있기 때문!
        //     models.learn-sequelize.sync({force:true}).then(_=>done());
        // }) //it이 실행될 때 먼저 실행되는 후커 함수
        it('유저 객체를 담은 배열로 응답한다.', (done) => {
            request(app) //supertest에 express 객체를 넘겨줌
                .get('/users') //get 요청을 보내는 것
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array);
                    done();
                })
        });
        it('최대 limit  갯수만큼 응답한다.', (done) => {
            request(app) //supertest에 express 객체를 넘겨줌
                .get('/users?limit=2') //get 요청을 보내는 것
                .end((err, res) => {
                    res.body.should.have.lengthOf(2);
                    done();
                })
        })
    })
    describe('실패시', () => {
        it('limit이 숫자형이 아니면 400을 응답한다.', (done) => {
            request(app)
                .get('/users?limit=two')
                .expect(400)
                .end(done);
        });
    });
});

describe('GET /users/:id은', () => {
    const users = [{name: 'alice'}, {name: 'bek'}, {name: 'chris'}];
    before(()=>models.sequelize.sync({force:true})); // mocha에서 자동으로 비동기 처리해준다.
    before(()=> models.User.bulkCreate(users));
    describe('성공시', () => {
        it('id가 1인 유저 객체를 반환한다.', (done) => {
            request(app)
                .get('/users/1')
                .end((err, res) => {  //API가 호출된 결과가 응답이 된다.
                    res.body.should.have.property('id', 1)
                    done();
                });
        });
    });
    describe('실패시', () => {
        it('id가 숫자가 아닐경우 400으로 응답한다', (done) => {
            request(app)
                .get('/users/one')
                .expect(400) // 에러 상태코드 체크
                .end(done);
        });
        it('id로 유저를 찾을 수 없을 경우 404로 응답한다', (done) => {
            request(app)
                .get('/users/999')
                .expect(404)
                .end(done);
        });
    });
});

describe('DELETE /users/:id은', () => {
    const users = [{name: 'alice'}, {name: 'bek'}, {name: 'chris'}];
    before(()=>models.sequelize.sync({force:true})); // mocha에서 자동으로 비동기 처리해준다.
    before(()=> models.User.bulkCreate(users));
    describe('성공시', () => {
        it('204를 응답한다', (done) => {
            request(app)
                .delete('/users/1')
                .expect(204)
                .end(done);
        })
    });
    describe('실패시', () => {
        it('id가 숫자가 아닐 경우 400으로 응답한다', done => {
            request(app)
                .delete('/users/one')
                .expect(400)
                .end(done);
        })
    });
});

describe('POST /users은', () => {
    const users = [{name: 'alice'}, {name: 'bek'}, {name: 'chris'}];
    before(()=>models.sequelize.sync({force:true})); // mocha에서 자동으로 비동기 처리해준다.
    before(()=> models.User.bulkCreate(users));
    describe('성공시', () => {
        let name = 'daniel',
            body;
        before(done => {
            request(app)
                .post('/users')
                .send({name})
                .expect(201)
                .end((err, res) => {
                    body = res.body;
                    done()
                });
        }); //mocha의 함수 test case가 시작되기전에 실행되는 함수

        it('생성된 유저 객체를 반환한다.', () => {
            body.should.have.property('id');
        });
        it('입력한 name을 반환한다.', () => {
            body.should.have.property('name', name)
        });
    });
    describe('실패시', () => {
        it('name 파라메터 누락시 400을 반환한다.', (done) => {
            request(app)
                .post('/users')
                .send({})
                .expect(400)
                .end(done)
        });
        it('name이 중복일 경우 409를 반환한다.', (done) => {
            request(app)
                .post('/users')
                .send({name: 'daniel'})
                .expect(409)
                .end(done)
        })
    });
});

describe('PUT /users/:id', () => {
    const users = [{name: 'alice'}, {name: 'bek'}, {name: 'chris'}];
    before(()=>models.sequelize.sync({force:true})); // mocha에서 자동으로 비동기 처리해준다.
    before(()=> models.User.bulkCreate(users));

    describe('성공시', () => {
        it('변경된 name을 응답한다', (done) => {
            const name = 'chally';
            request(app)
                .put('/users/3')
                .send({name})
                .end((err, res) => {
                    res.body.should.have.property('name', name);
                    done();
                })
        });
    });
    describe('실패시', () => {
        it('정수가 아닌 id일 경우 400을 응답한다.', done => {
            request(app)
                .put('/users/one')
                .expect(400)
                .end(done);
        });
        it('name이 없을 경우 400을 응답한다', done => {
            request(app)
                .put('/users/1')
                .send({})
                .expect(400)
                .end(done);
        });
        it('없는 유저일 경우 404를 응답한다.', done => {
            request(app)
                .put('/users/999')
                .send({name : 'foo'})
                .expect(404)
                .end(done);
        });
        it('이름이 중복일 경우 409를 입력한다..', done => {
            request(app)
                .put('/users/3')
                .send({name: 'bek'})
                .expect(409)
                .end(done);
        });
    });
});