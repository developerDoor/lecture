const request = require('supertest');
const should = require('should');
const app = require('./index.js');

describe('GET /users는', () => {
    describe('성공시', () => {
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
    describe('실패시', ()=>{
        it('limit이 숫자형이 아니면 400을 응답한다.', (done) => {
            request(app)
                .get('/users?limit=two')
                .expect(400)
                .end(done);
        });
    });
});

describe('GET /users/1은', () =>{
    describe('성공시', ()=>{
        it('id가 1인 유저 객체를 반환한다.', (done)=>{
            request(app)
                .get('/users/1')
                .end((err, res) =>{  //API가 호출된 결과가 응답이 된다.
                    res.body.should.have.property('id', 1)
                    done();
                });
        });
    });
    describe('실패시', ()=> {
        it('id가 숫자가 아닐경우 400으로 응답한다', (done)=>{
            request(app)
                .get('/users/one')
                .expect(400) // 에러 상태코드 체크
                .end(done);
        });
        it('id로 유저를 찾을 수 없을 경우 404로 응답한다', (done)=>{
            request(app)
                .get('/users/999')
                .expect(404)
                .end(done);
        });
    });
});

describe('DELETE /users/1은', ()=>{
    describe('성공시', ()=> {
       it('204를 응답한다', (done)=>{
           request(app)
               .delete('/users/1')
               .expect(204)
               .end(done);
       })
    });
    describe('실패시', ()=> {
        it('id가 숫자가 아닐 경우 400으로 응답한다', done=>{
            request(app)
                .delete('/users/one')
                .expect(400)
                .end(done);
        })
    });
});

describe('POST /users은', ()=>{
    describe('성공시', ()=> {
        let name = 'daniel',
            body;
        before(done=>{
            request(app)
                .post('/users')
                .send({name})
                .expect(201)
                .end((err, res) => {
                    body = res.body;
                done()
            });
        }); //mocha의 함수 test case가 시작되기전에 실행되는 함수

        it('생성된 유저 객체를 반환한다.', ()=>{
            body.should.have.property('id');
        });
        it('입력한 name을 반환한다.', ()=>{
            body.should.have.property('name', name)
        });
    });
    describe('실패시',  ()=> {
        it('name 파라메터 누락시 400을 반환한다.', (done) =>{
            request(app)
                .post('/users')
                .send({})
                .expect(400)
                .end(done)
        });
        it('name이 중복일 경우 409를 반환한다.', (done)=>{
            request(app)
                .post('/users')
                .send({name : 'kim'})
                .expect(409)
                .end(done)
        })
    });
});