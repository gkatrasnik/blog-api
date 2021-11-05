var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  author: { type: String, required },
  content: { type: String, required },
  timestamp: { type: Date, default: Date.now },
});

//Export model
module.exports = mongoose.model("Comment", CommentSchema);
