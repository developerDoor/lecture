require("./ex"); // 이거 왜 변수에 안담아요? 안담아도 된다.
//ex.js 파일이 한번 실행은 되지만 거기에 있는 변수나 함수는 가져오지 않는다.
// require.main으로 어떤 파일을 실행한건지 알 수 있다.
// require로 처음 파일을 읽고 그다음에는 캐시(메모리)에서 불러온다. 캐싱이란 하드디스크에 있는 정보를 메모리에 올리는 작업이다.