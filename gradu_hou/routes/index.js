var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // 渲染了index.html这个页面
  res.render('index', { title: 'Express,very Good' });
});

module.exports = router;
