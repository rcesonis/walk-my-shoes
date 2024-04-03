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
    models.Post.belongsTo(models.User, { foreignKey: "userId" });
  }
}
Post.init(
  {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "Post",
  }
);
module.exports = Post;
