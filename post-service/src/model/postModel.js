const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../database/db')

const Post = sequelize.define('Post', {

    id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    likes: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    dislikes: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    }
}, {tableName: 'post'});

module.exports = Post

