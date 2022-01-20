'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estudante extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Estudante.belongsTo(models.Area)
      Estudante.belongsTo(models.Endereco_estudante)
      Estudante.hasMany(models.Certificado)
      Estudante.hasMany(models.Formacao)
    }
  };
  Estudante.init({
    CPF: DataTypes.CHAR,
    nome: DataTypes.STRING,
    sobrenome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    RG: DataTypes.CHAR,
    sobre: DataTypes.TEXT,
    github: DataTypes.STRING,
    imagem: DataTypes.STRING,
    areaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Estudante',
  });
  return Estudante;
};