'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Estudantes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CPF: {
        type: Sequelize.CHAR
      },
      nome: {
        type: Sequelize.STRING
      },
      sobrenome: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      senha: {
        type: Sequelize.STRING
      },
      RG: {
        type: Sequelize.CHAR
      },
      sobre: {
        type: Sequelize.TEXT
      },
      github: {
        type: Sequelize.STRING
      },
      imagem: {
        type: Sequelize.STRING
      },
      areaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'areas',
          key: 'id'
        },
        onUpdate: 'restrict',
        onDelete: 'restrict'
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Estudantes');
  }
};