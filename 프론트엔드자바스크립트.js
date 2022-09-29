// GET 요청 보내기
// axios.get 함수의 인수로 요청을 보낼 주소를 넣으면 된다.
// 프로미스 기반 코드라 async/await 사용가능

axios.get('https://www.zerocho.com/api/get')
.then((result) => {
    console.log(result);
    console.log(result.data); // {}
})
.catch((error) => {
    console.error(error);
});

(async () => {
    try {
        const result = await axios.get('https://www.zerocho.com/api/get');
        console.log(result);
        console.log(result.data); // {}
    } catch (error) {

    }
})