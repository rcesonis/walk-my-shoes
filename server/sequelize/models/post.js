"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../database");

class Post extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    this.belongsTo(models.User, { as: "user", foreignKey: "userId" });
  }
}
Post.init(
  {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    isPublic: DataTypes.BOOLEAN,
  },
  {
    sequelize,
    modelName: "Post",
  }
);
module.exports = Post;
