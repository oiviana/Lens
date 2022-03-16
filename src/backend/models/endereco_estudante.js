'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Endereco_estudante extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Endereco_estudante.belongsTo(models.Estudante)
    }
  };
  Endereco_estudante.init({
    CEP: DataTypes.CHAR,
    logradouro: DataTypes.STRING,
    numero: DataTypes.INTEGER,
    bairro: DataTypes.STRING,
    cidade: DataTypes.STRING,
    UF: DataTypes.STRING,
    estudanteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Endereco_estudante',
  });
  return Endereco_estudante;
};