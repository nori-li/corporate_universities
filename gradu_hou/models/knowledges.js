var mongoose = require('mongoose')
// 定义表模型
var Schema = mongoose.Schema;
var knowledgeSchema = new Schema({
      kdname:String,
      kdpath:String,
      kdlabel:String,
      kdtype:String
})
// 取的名字跟数据库保持一致
module.exports = mongoose.model('Knowledge',knowledgeSchema)