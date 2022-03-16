'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Empresa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Empresa.belongsTo(models.Area)
      Empresa.belongsTo(models.Endereco_empresa)
      Empresa.hasMany(models.Vaga)
    }
  };
  Empresa.init({
    CNPJ: DataTypes.CHAR,
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    sobre: DataTypes.TEXT,
    imagem: DataTypes.STRING,
    areaId: DataTypes.INTEGER,
    site: DataTypes.STRING,
    atuacao: DataTypes.STRING,
    ano_fundacao: DataTypes.DATEONLY
  }, 
  {
    sequelize,
    modelName: 'Empresa',
  });
  return Empresa;
};