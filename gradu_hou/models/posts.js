var mongoose = require('mongoose')
// 定义表模型
var Schema = mongoose.Schema;
var postSchema = new Schema({
      label:String,
      childlist:Array
})
// 取的名字跟数据库保持一致
module.exports = mongoose.model('Post',postSchema)