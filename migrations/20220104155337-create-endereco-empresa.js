'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Endereco_empresas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CEP: {
        type: Sequelize.CHAR
      },
      logradouro: {
        type: Sequelize.STRING
      },
      numero: {
        type: Sequelize.INTEGER
      },
      bairro: {
        type: Sequelize.STRING
      },
      cidade: {
        type: Sequelize.STRING
      },
      UF: {
        type: Sequelize.STRING
      },
      empresaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'empresas',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
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
    await queryInterface.dropTable('Endereco_empresas');
  }
};