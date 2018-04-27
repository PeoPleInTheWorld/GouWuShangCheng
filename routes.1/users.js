var express = require('express');
var router = express.Router();

/* GET users listing. */
//  /users


router.get('/', function(req, res, next) {
  //直接返回一个字符串
  res.send('respond with a resource!');
});

module.exports = router;
