const express = require('express');
const morgan = require('morgan'); // 써트파티 미들웨어

//어플리케이션 객체
// 미들웨어 역할
// 라우팅 설정 가능
// 서버 요청 대기 상태로 만들 수 있음
const app = express();

// function logger(req, res, next) { // 일반 미들웨어
//     console.log('i am logger');
//     next(); // 중요! 미들웨어에 기능 수행 후 반드시 호출해야함
// }
//
// function logger2(req, res, next) {
//     console.log('i am logger2');
//     next();
// }
//
// app.use(logger); //미들웨어 사용
// app.use(logger2);

function commonmw(req, res, next) { //일반 미들웨어
    console.log('commonmw');
    next(new Error('error occered'));
}

function errormw(err, req, res, next) { //에러 미들웨어
    console.log(err.message);
    //에러를 처리 한 후
    next();
}

app.use(commonmw);
app.use(errormw);
app.use(morgan('dev'));

app.listen(3000, function(){
    console.log('Server is running');
})

