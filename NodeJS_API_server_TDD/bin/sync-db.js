const models = require('../models')

module.exports = () =>{
    const options = {
        force: process.env.NODE_ENV === 'test' ? true : false
    };
    return models.sequelize.sync(options)
    // models.learn-sequelize.sync는 내부적으로 promise를 return하게 되어있다. 그래서 비동기처리를 완료할 수 있도록 인터페이스를 제공한다.
}