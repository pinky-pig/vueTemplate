const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 定义 Schema, 也就是传统意义的表结构
const UserSchema = new Schema({
  _id:String,
  _name:String,
  _phone: Number
},
  { collection: "test" }
)

const User = mongoose.model('User', UserSchema)

module.exports = User
