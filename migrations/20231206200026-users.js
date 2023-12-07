"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.createTable("users", { 
      id: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ci: {
        type: Sequelize.STRING,
        allowNull: false
      },
      gender: {
        type: Sequelize.CHAR,
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

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     */

    await queryInterface.dropTable('users');
  },
};
