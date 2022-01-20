'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vaga extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Vaga.belongsTo(models.Empresa)
      Vaga.hasMany(models.Candidaturas)
    }
  };
  Vaga.init({
    titulo: DataTypes.STRING,
    descricao: DataTypes.TEXT,
    status: DataTypes.STRING,
    periodo: DataTypes.STRING,
    data: DataTypes.DATEONLY,
    empresaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Vaga',
  });
  return Vaga;
};