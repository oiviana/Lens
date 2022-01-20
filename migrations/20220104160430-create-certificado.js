'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Certificados', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING
      },
      data_emissao: {
        type: Sequelize.DATEONLY
      },
      arquivo: {
        type: Sequelize.STRING
      },
      tipo: {
        type: Sequelize.STRING
      },
      estudanteId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'estudantes',
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
    await queryInterface.dropTable('Certificados');
  }
};