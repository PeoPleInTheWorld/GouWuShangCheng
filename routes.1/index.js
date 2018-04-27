var express = require('express');
var router = express.Router();

/* GET home page. */

// 当进入到这里的时候  path  /

router.get('/', function(req, res, next) {
  //将index.ejs模板渲染成html，返回给前端
  res.render('index', { title: 'HTML5-1714' });
});


module.exports = router;
