'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Endereco_empresa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Endereco_empresa.belongsTo(models.Empresa)
    }
  };
  Endereco_empresa.init({
    CEP: DataTypes.CHAR,
    logradouro: DataTypes.STRING,
    numero: DataTypes.INTEGER,
    bairro: DataTypes.STRING,
    cidade: DataTypes.STRING,
    UF: DataTypes.STRING,
    empresaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Endereco_empresa',
  });
  return Endereco_empresa;
};