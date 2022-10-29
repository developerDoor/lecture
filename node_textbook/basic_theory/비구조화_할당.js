//비구조화_할당

const example = { a: 123, b: { c: 135, d: 146 }};
const a = example.a;
const d = example.b.d;

// 구조분해 할당
const { a, b: { d }} = example;

// 배열 구조분해 할당
const arr = [1, 2, 3, 4, 5]
const x = arr[0];
const y = arr[1];
const z = arr[4];

const [x,y,,, z] = arr;

// this가 있을떄는 구조분해 할당 하지않은것이 좋다.
// this는 함수를 호출할 때 어떻게 호출되었냐에 따라 결정되기 때문이다.