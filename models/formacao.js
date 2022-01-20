'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Formacao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Formacao.belongsTo(models.Estudante)
      Formacao.belongsTo(models.Instformacao)
    }
  };
  Formacao.init({
    curso: DataTypes.STRING,
    data_inicio: DataTypes.DATEONLY,
    data_termino: DataTypes.DATEONLY,
    periodo: DataTypes.STRING,
    estudanteId: DataTypes.INTEGER,
    instformacaoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Formacao',
  });
  return Formacao;
};