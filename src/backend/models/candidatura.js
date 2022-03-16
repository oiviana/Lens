'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Candidatura extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Candidatura.belongsTo(models.Estudante)
      Candidatura.belongsTo(models.Vaga)

    }
  };
  Candidatura.init({
    status: DataTypes.STRING,
    vagaId: DataTypes.INTEGER,
    estudanteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Candidatura',
  });
  return Candidatura;
};