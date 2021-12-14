const utils = require('./utils');
const assert = require('assert');
const should = require('should');

//.spec 이 존재하면 테스트코드 파일
describe('utils.js모듈의 capitalize() 함수는 ' , () => {
    it('문자열의 첫번째 문자를 대문자로 변환한다.', () => {
        const result = utils.capitalize('hello');
        assert.equal(result, 'Hello'); // assert 사용
        result.should.be.equals('Hello'); // should 사용
    });
});

//terminal
// node_modules/.bin/mocha TDD/utils.spec.js

