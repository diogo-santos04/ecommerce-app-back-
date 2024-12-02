const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Importa sua configuração de conexão

const Usuario = sequelize.define(
  "usuarios",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "usuarios",
  }
);

module.exports = Usuario;
