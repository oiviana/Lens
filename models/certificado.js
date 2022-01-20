'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Certificado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Certificado.belongsTo(models.Estudante)
    }
  };
  Certificado.init({
    titulo: DataTypes.STRING,
    data_emissao: DataTypes.DATEONLY,
    arquivo: DataTypes.STRING,
    tipo: DataTypes.STRING,
    estudanteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Certificado',
  });
  return Certificado;
};