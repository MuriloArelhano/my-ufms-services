
module.exports = {
  up: async (queryInterface, Sequelize) => {

    const PostTable = queryInterface.createTable('post', {
      id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.DataTypes.UUIDV4,
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
    })

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable('post');

  }
};
