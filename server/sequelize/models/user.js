"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../database");

class User extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    models.User.hasMany(models.Post, { as: "posts", foreignKey: "userId" });
  }
}

User.init(
  {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    googleId: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "User",
  }
);

module.exports = User;
