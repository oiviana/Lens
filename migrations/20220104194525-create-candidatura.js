'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Candidaturas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      vagaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'vagas',
          key: 'id'
        },
        onUpdate: 'restrict',
        onDelete: 'restrict'
      },
      estudanteId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'estudantes',
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
    await queryInterface.dropTable('Candidaturas');
  }
};