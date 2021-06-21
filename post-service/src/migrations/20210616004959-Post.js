
module.exports = {
  up: async (queryInterface, Sequelize) => {

    const PostTable = queryInterface.createTable('post', {
      id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false
      },
      description: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },
      likes: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      dislikes: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
      }
    }, { timestamp: true, createdAt: true, updatedAt: true })

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable('post');

  }
};
