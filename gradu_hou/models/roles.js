var mongoose = require('mongoose')
// 定义表模型
var Schema = mongoose.Schema;
var roleSchema = new Schema({
      role:String,
      isAdmin:String,
      isManager:String
})
// 取的名字跟数据库保持一致
module.exports = mongoose.model('Role',roleSchema)    