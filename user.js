const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const plm = require("passport-local-mongoose");
const passportLocalMongoose =
  typeof plm === "function" ? plm : plm && plm.default ? plm.default : plm;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

userSchema.plugin(passportLocalMongoose);

// const User = mongoose.model("User", userSchema);

module.exports = mongoose.model("User", userSchema);
