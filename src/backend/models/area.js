'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Area extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Area.hasMany(models.Estudante)
      Area.hasMany(models.Empresa)
    }
  };
  Area.init({
    nome_area: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Area',
  });
  return Area;
};