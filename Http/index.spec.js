const app = require('./index');
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

describe('GET /user/1 은', () => {
    describe('성공시', () => {
        it('id가 1인 유저 객체를 반환한다.' , (done) => {
            request(app)
                .get('/user/1')
                .end((err,res) => {
                    res.body.should.have.property('id', 1);
                    done();
                })
        })
    })
    describe('실패시', () => {
        it('id가 숫자가 아닐경우 400으로 응답한다.' , (done) => {
            request(app)
                .get('/user/aa')
                .expect(400)
                .end(done);
        })
        it('id로 유저를 찾을 수 없는경우 404로 응답한다.' , (done) => {
            request(app)
                .get('/user/4')
                .expect(404)
                .end(done);
        })
    })
})



