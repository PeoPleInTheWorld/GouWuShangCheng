var express = require('express');
var router = express.Router();
const getbanner = require("../modules/getbanner")
const getGoods = require("../modules/getGoods")
/* GET home page. */

// 当进入到这里的时候  path  /

router.get('/', function(req, res, next) {
  //将index.ejs模板渲染成html，返回给前端
  getbanner((banners)=>{
    getGoods({pageNum:1,pageSize:4},(goods)=>{
      res.render('index', { title: '小清新购物商城上线了！' ,banners,goods });
    })
   
  })

});
//列表页
router.get('/list', function(req, res, next) {
  //将index.ejs模板渲染成html，返回给前端
  getGoods({pageNum:1,pageSize:4},(goods)=>{
    res.render('list', { title: '小清新购物商城上线了！'});
  })
});
//详情页
router.get('/detail', function(req, res, next) {
  //将index.ejs模板渲染成html，返回给前端
  let goodid = req.query.goodid
  getGoods(goodid,(goods)=>{
    console.log(goods,123)
    res.render('detail', { title: '小清新购物商城上线了！',goods});
  })

});
//购物车页面


// const getCar = require("../modules/getCar")
// router.get('/car', function(req, res, next) {
//   //将index.ejs模板渲染成html，返回给前端
//   let cookies = req.cookies
//   let username = cookies.user_info?JSON.parse(cookies.user_info).username:''
//   getCar(username,(cars)=>{
    
//     // 'not login'  []  {}
//     res.render('car', { title: 'HTML5-1714',cars});
//   })
  
// });


const getCar = require("../modules/getCar")
router.get('/car', function(req, res, next) {
  //将index.ejs模板渲染成html，返回给前端
  let cookies = req.cookies
  let username = cookies.user_info?JSON.parse(cookies.user_info).username:''
  getCar(username,(cars)=>{
    // 'not login'  []  {}
    res.render('car', { title: '小清新购物商城上线了！',cars});
  })
  
});



module.exports = router;







