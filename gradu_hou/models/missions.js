var mongoose = require('mongoose')
// 定义表模型
var Schema = mongoose.Schema;
var missionSchema = new Schema({
      username:String,
      kdname:String,
      assigner:String,
      kdpath:String,
      kdtype:String
})
// 取的名字跟数据库保持一致
module.exports = mongoose.model('Mission',missionSchema)