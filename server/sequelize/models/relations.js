const User = require("./user");
const Post = require("./post");
const Like = require("./like");
const Event = require("./event");
const Comment = require("./comment");

// Define associations between models
User.hasMany(Post, { as: "posts", foreignKey: "userId" });
Post.belongsTo(User, { as: "author", foreignKey: "userId" });

User.hasMany(Like, { as: "likes", foreignKey: "userId" });
Like.belongsTo(User, { as: "liker", foreignKey: "userId" });

User.hasMany(Event, { as: "events", foreignKey: "userId" });
Event.belongsTo(User, { as: "organizer", foreignKey: "userId" });

User.hasMany(Comment, { as: "comments", foreignKey: "userId" });
Comment.belongsTo(User, { as: "commenter", foreignKey: "userId" });

// Export models
module.exports = {
  User,
  Post,
  Like,
  Event,
  Comment,
};
