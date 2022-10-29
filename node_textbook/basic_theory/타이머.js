// set 메서드엥 clear 메서드가 대응된다.
// - setTimeout(콜백, 밀리초) : 주어진 밀리초(1000분의 1초) 이후에 콜백 함수를 실행
// - setInterval(콜백, 밀리초) : 주어진 밀리초마다 콜백함수를 반복실행
// - setImmediate(콜백) : 콜백함수를 즉시 실행

// - claerTimeout(아이디) : setTimeout을 취소
// - clearInnterval(아이디) : setInterval을 취소
// - clearImmediate(아이디) : clearImmediate을 취소

const hello = setInterval(() => console.log("hello"), 1000);
hello();
