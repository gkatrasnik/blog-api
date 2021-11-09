var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  author: { type: String, required: true },
  content: { type: String, required: true },
  postId: { type: String },
  timestamp: { type: Date, default: Date.now },
});

//Export model
module.exports = mongoose.model("Comment", CommentSchema);
