var mongoose = require('mongoose')
// 定义表模型
var Schema = mongoose.Schema;
var userSchema = new Schema({
      username:String,
      password:String,
      role:String,
      label:String,
      childlist:Array
},{versionKey:false})
// 取的名字跟数据库保持一致
module.exports = mongoose.model('User',userSchema)