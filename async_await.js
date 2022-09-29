// promise 지옥에서 방지!
// 변수 = await 프로미스; 인 경우 프로미스가 resolve된 값이 변수에 저장
// 변수 await 값;인 경우 그 값이 변수에 저장
// await이 then 역할을 한다고 보면된다.
// Async 함수는 항상 promise를 반환한다(return)
// - then이나 await을 붙일 수 있음

async function findAndSaveUser(Users) {
    let user = await Users.findOne({}); // await이 then역할을 한다. 실행순서가 오른쪽에서 왼쪽으로 간다.
                                        // Users.fineOne이 promise면 await(then)해서 결과값을 user로(오른쪽) 넣는다.
    user.name = 'moon';
    user = await user.save();
    user = await Users.findOne({ gender : 'm' });
}

async function main() {
    const result = await promise;
    return 'moon'
}

main().then((name) => ...) // async 함수에서 리턴한것들은 전부다 then으로 받아야한다. async도 promise이다.
const name = await main()

// async await 을 사용할 떄 주의할 점은 실패했을 때 경우가 없다. catch가 없다. try ~ catch 사용하면 된다.