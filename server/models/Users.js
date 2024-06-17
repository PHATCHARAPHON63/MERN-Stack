
//server\models\Users.js
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    nickname: String,
    birthdate: Date,
    age: Number,
    gender: String,
  });
  
const UserModel = mongoose.model("users",UserSchema)
module.exports = UserModel