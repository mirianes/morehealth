'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Prontuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dataAtt: {
        type: Sequelize.DATE
      },
      cartaoSUS: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING
      },
      dataNasc: {
        type: Sequelize.DATE
      },
      raca: {
        type: Sequelize.STRING
      },
      sexo: {
        type: Sequelize.STRING
      },
      estCivil: {
        type: Sequelize.STRING
      },
      grauInst: {
        type: Sequelize.STRING
      },
      queixa: {
        type: Sequelize.STRING
      },
      historico: {
        type: Sequelize.STRING
      },
      doencas: {
        type: Sequelize.STRING
      },
      alergias: {
        type: Sequelize.STRING
      },
      doadorOrgao: {
        type: Sequelize.STRING
      },
      doadorSangue: {
        type: Sequelize.STRING
      },
      outrasInfo: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Prontuarios');
  }
};