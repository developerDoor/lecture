const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
            age: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            married: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            comment: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE, // DATETIME MYSQL DATE -> sequelize DateOnly
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps: false, // 타임스템프를 true로 하면 createdAt, updatedAt을 자동으로 생성해준다.
            underscored: false, // created_at 으로 할지 createdAt 으로 할지 정하는 것
            modelName: 'User', // Bird
            tableName: 'users', // birds
            paranoid: false, // deletedAt을 만들어준다 soft delete를 사용할 때 true로!
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
    }
};
