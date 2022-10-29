// 프로미스 : 내용은 실행되었지만 결과를 아직 반환하지 않은 객체
// then을 붙이면 결과를 반환함
// 실행이 완료되지 않았으면 완료된 후에 then 내부 함수가 실행됨
// Resolve(성공리턴값) -> then으로 연결
// Reject(실패리턴값) -> catch로 연결
// Finally 부분은 무조건 실행됨

const condition = true; // true면 resolve, false면 reject
const promise = new Promise((resolve, reject) => {
    if(condition) {
        resolve('성공');
    } else {
        reject('실패');
    }
    // if문 까지는 동기로 실행된다.
    // callback은 다른 함수에 붙어서 바로 시작된다.
});
// 다른코드가 들어갈 수 있음
promise
.then((message) => {
    console.log(message); // 성공(resolve)한 경우 실행
})
.catch((error) => {
    console.log(error); // 실패(reject)한 경우 실행
})

// Promise.all(배열) : 여러개의 프로미스들을 동시에 실행
// 하나라도 실패하면 catch로 간다.
// 위를 수정한 것이  allSettled이다. 실패한것만 추려낼 수 있다.

