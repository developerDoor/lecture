const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model { // User 클래스가 모델이 된다. 모델은 MYSQL의 테이블과 매칭된다.
  static init(sequelize) {
    return super.init({
      // 시퀄라이저는 아이디(PK)는 기본적으로 생략한다.
      email: {
        type: Sequelize.STRING(40),
        allowNull: true, // 요고는 좀 특이한 상황 NULL 두개는 유니크하다고 쳐준다.
        unique: true,
      },
      nick: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true, // 카카오로그인 구현
      },
      provider: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'local',
      },
      snsId: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true, // createdAt, updatedAt 기록
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true, // deletedAt 기록
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.belongsToMany(db.User, {
      foreignKey: 'followingId',
      as: 'Followers',
      through: 'Follow',
    });
    db.User.belongsToMany(db.User, {
      foreignKey: 'followerId',
      as: 'Followings',
      through: 'Follow',
    });
  }
};
