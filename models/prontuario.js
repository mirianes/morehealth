'use strict';
module.exports = (sequelize, DataTypes) => {
  const Prontuario = sequelize.define('Prontuario', {
    dataAtt: DataTypes.DATE,
    cartaoSUS: DataTypes.STRING,
    nome: DataTypes.STRING,
    dataNasc: DataTypes.DATE,
    raca: DataTypes.STRING,
    sexo: DataTypes.STRING,
    estCivil: DataTypes.STRING,
    grauInst: DataTypes.STRING,
    queixa: DataTypes.STRING,
    historico: DataTypes.STRING,
    doencas: DataTypes.STRING,
    alergias: DataTypes.STRING,
    doadorOrgao: DataTypes.STRING,
    doadorSangue: DataTypes.STRING,
    outrasInfo: DataTypes.STRING
  }, {});
  Prontuario.associate = function(models) {
    // associations can be defined here
  };
  return Prontuario;
};