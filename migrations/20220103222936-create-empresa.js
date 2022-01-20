'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Empresas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CNPJ: {
        type: Sequelize.CHAR
      },
      nome: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      senha: {
        type: Sequelize.STRING
      },
      sobre: {
        type: Sequelize.TEXT
      },
      site: {
        type: Sequelize.STRING
      },
      atuacao: {
        type: Sequelize.STRING
      },
      ano_fundacao: {
        type: Sequelize.DATEONLY
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
    await queryInterface.dropTable('Empresas');
  }
};