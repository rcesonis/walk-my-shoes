const User = require("./user");
const Post = require("./post");
const Like = require("./like");
const Event = require("./event");
const Comment = require("./comment");

// A user can have many posts
User.hasMany(Post, { as: "posts", foreignKey: "userId" });
Post.belongsTo(User, { as: "user", foreignKey: "userId" });

// A user can have many likes
User.hasMany(Like, { as: "likes", foreignKey: "userId" });
Like.belongsTo(User, { as: "user", foreignKey: "userId" });

// A user can have many events
User.hasMany(Event, { as: "events", foreignKey: "userId" });
Event.belongsTo(User, { as: "user", foreignKey: "userId" });

// A user can have many comments
User.hasMany(Comment, { as: "comments", foreignKey: "userId" });
Comment.belongsTo(User, { as: "user", foreignKey: "userId" });

module.exports = {
  User,
  Post,
  Like,
  Event,
  Comment,
};
