import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../database/database.js"; 

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

export default Usuario;
