'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Formacaos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      curso: {
        type: Sequelize.STRING
      },
      data_inicio: {
        type: Sequelize.DATEONLY
      },
      data_termino: {
        type: Sequelize.DATEONLY
      },
      periodo: {
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
      instformacaoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'instformacaos',
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
    await queryInterface.dropTable('Formacaos');
  }
};