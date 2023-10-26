const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {type: String, required: true, unique: true},
    fullname: {type: String},
    // email: {type: String, required: true, unique: true},
    email: {type: String},
    password: {type: String, required: true},
    isAdmin: {
      type: Boolean, 
      default: false
    },
    img: { type: String },
    address: {type: String},
    phone: {type: String},
    occupation: {type: String},
    gender: {type: String},
    active: {type: Boolean, default: true},
  }, 
  {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);