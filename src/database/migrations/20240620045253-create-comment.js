'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_photo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Photos', // Nama model tabel yang direferensikan
          key: 'id' // Kolom yang direferensikan
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Nama model tabel yang direferensikan
          key: 'id' // Kolom yang direferensikan
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} _Sequelize
   */
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Comments');
  }
};
