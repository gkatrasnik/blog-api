var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: { type: String, required },
  password: { type: String, required },
});

module.exports = mongoose.model("User", UserSchema);
