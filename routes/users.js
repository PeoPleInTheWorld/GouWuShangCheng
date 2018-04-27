var express = require('express');
var router = express.Router();

/* GET users listing. */
//  /users/login


router.get('/', function(req, res, next) {
  //直接返回一个字符串
  
});

router.get('/login', function(req, res, next) {
  //直接返回一个字符串
    res.render("login")
});

const login = require("../modules/login")
router.get('/login.do', function(req, res, next) {
  //直接返回一个字符串
   //1.前端传递过来的数据  get
   let params = req.query
  
   login(params,(info)=>{
     res.send({nickname:info.nickname,username:info.username})
   },()=>{
     res.send('1')
   })

});


router.get('/register', function(req, res, next) {
  //直接返回一个字符串
    res.render("register")
});

const register = require("../modules/register")
router.post('/register.do', function(req, res, next) {
  //直接返回一个字符串
  // post 数据怎么接收 req.body
  register(req.body,()=>{
      res.send('0')
  },()=>{res.send('1')})
});



module.exports = router;


