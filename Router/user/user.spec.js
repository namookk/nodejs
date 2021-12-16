// test코드

const app = require('../../Http/index');
const should = require('should');
const request = require('supertest');

describe('GET /users는 ', () => {
    describe('성공시', () => {
        it('유저 객체를 담은 배열로 응답한다. ', (done) => {
            request(app)
                .get('/users')
                .end((err, res) => {
                    res.body.should.be.instanceof(Array); //배열인지 화인
                    done(); //비동기이기 때문에
                });
        });

        it('최대 limit 수 만큼 응답한다. ', (done) => {
            request(app)
                .get('/users?limit=2')
                .end((err, res) => {
                    res.body.should.have.lengthOf(2); // length가 2 여야 함
                    done();
                })
        });
    });
    describe('실패시', () => {
        it('limit이 숫자형이 아니면 400을 응답한다.', (done) => {
            request(app)
                .get('/users?limit=aee')
                .expect(400)
                .end(done);
        })
    })
})

//Http.method GET
describe('GET /user/1 은', () => {
    describe('성공시', () => {
        it('id가 1인 유저 객체를 반환한다.' , (done) => {
            request(app)
                .get('/users/1')
                .end((err,res) => {
                    res.body.should.have.property('id', 1);
                    done();
                })
        })
    })
    describe('실패시', () => {
        it('id가 숫자가 아닐경우 400으로 응답한다.' , (done) => {
            request(app)
                .get('/users/aa')
                .expect(400)
                .end(done);
        })
        it('id로 유저를 찾을 수 없는경우 404로 응답한다.' , (done) => {
            request(app)
                .get('/users/4')
                .expect(404)
                .end(done);
        })
    })
})

//Http.method DELETE
describe('DELETE /user/1', () => {
    describe('성공시', () => {
        it('id가 1인 유저를 삭제한다. 204를 응답한다.', (done) => {
            request(app)
                .delete('/users/1')
                .expect(204)
                .end(done);
        })
    })

    describe('실패시', () => {
        it('id가 숫자가 아닐 경우 400으로 응답한다.', (done) => {
            request(app)
                .delete('/users/ab')
                .expect(400)
                .end(done);
        })
    })
})

//Http.method POST
describe('POST /users', () => {
    describe('성공시', () =>{
        const name = 'namookk4';
        let body, status;

        before(done => {
            request(app)
                .post('/users')
                .send({name : name})
                .expect(201)
                .end((err, res) => {
                    status = res.status;
                    body = res.body;
                    done();
                });
        });

        it('성공시', () =>{
            status.should.be.equals(201);
        })
        it('생성된 유저 객체를 반환한다.', () => {
            body.should.have.property('id');
        })
        it('입력한 name을 반환한다.', () =>{
            body.should.have.property('name' , name);
        })
    })

    describe('실패시', () => {
        it('name 파라미터 누락시 400을 반환한다.', (done) => {
            request(app)
                .post('/users')
                .send({})
                .expect(400)
                .end(done);
        })
        it('name이 중복일 경우 409를 반환한다', (done) => {
            request(app)
                .post('/users')
                .send({name : 'namookk4'})
                .expect(409)
                .end(done);
        })
    })
})

//Http.method PUT
describe('PUT /user/1', () => {
    describe('성공시', () => {
        const name = 'namookk10';
        const id = 2;
        let body;
        before(done => {
            request(app)
                .put(`/users/${id}`)
                .send({name : name})
                .end((err, res) => {
                    body = res.body;
                    done();
                })
        })

        it('성공시', () => {
            body.should.have.property('id', id);
            body.should.have.property('name', name);
        })
    })

    describe('실패시', () =>{
        it('id가 숫자가 아닐 경우 400을 반환한다.', (done) => {
            request(app)
                .put('/users/abc')
                .send({name : 'namookk10'})
                .expect(400)
                .end(done);
        })
        it('name이 없을 경우 400을 반환한다.', (done) => {
            request(app)
                .put('/users/1')
                .send({})
                .expect(400)
                .end(done);
        })
        it('없는 유저일 경우 404를 반환한다', (done) => {
            request(app)
                .put('/users/10')
                .send({name : 'namookk10'})
                .expect(404)
                .end(done);
        })
        it('name이 중복될 경우 409를 반환한다.', (done) => {
            request(app)
                .put('/users/2')
                .send({name : 'namookk4'})
                .expect(409)
                .end(done);
        })
    })
})
