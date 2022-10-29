console.log(this); // global?
console.log(this === module.exports === {} === exports)


function a() {
  console.log(this === global);
}
a();

// 나머지는 JS this 와 똑같다.
// function마다 this 새로생기는것, 화살표함수에서는 부모의 this 물려받는다.