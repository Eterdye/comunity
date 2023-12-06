const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taxt: {
      type: DataTypes.STRING,
    },
    sex: {
      type: DataTypes.CHAR,
    },
  });
