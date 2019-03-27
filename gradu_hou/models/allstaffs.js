var mongoose = require('mongoose')
// 定义表模型
var Schema = mongoose.Schema;
var allstaffSchema = new Schema({
      username:String,
      password:String,
      role:String,
      childlist:Array
})
// 取的名字跟数据库保持一致
module.exports = mongoose.model('Allstaff',allstaffSchema)