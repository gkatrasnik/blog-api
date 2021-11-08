var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  timestamp: { type: Date, default: Date.now },
  published: { type: Boolean, default: false, required: true },
});

module.exports = mongoose.model("Post", PostSchema);
