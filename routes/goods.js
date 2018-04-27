var express = require('express');
var router = express.Router();
const goods_util = require("../modules/goods")

// /goods
router.get('/', function(req, res, next) {
  //直接返回一个字符串
  
});

//加入购物车
router.post('/add.do', function(req, res, next) {
  //直接返回一个字符串
  let params = req.body
  goods_util.add(params,(results)=>{
    res.send(results+'')
  })
   
});


//减去购物车
router.post('/reduce.do', function(req, res, next) {
  //直接返回一个字符串
  let params = req.body
  goods_util.reduce(params,(results)=>{
    res.send(results+'')
  }) 
});

router.post('/remove.do', function(req, res, next) {
  //直接返回一个字符串
  let params = req.body
  goods_util.remove(params,(results)=>{
    res.send(results+'')
  })
});

router.post('/clear.do', function(req, res, next) {
  //直接返回一个字符串
  let params = req.body
  goods_util.clear(params,(results)=>{
    res.send(results+'')
  })
});


const getGoods = require("../modules/getGoods")
router.get('/getGoods', function(req, res, next) {
  //直接返回一个字符串
  let params = req.query
  getGoods(params,(results)=>{
    res.send(results)
  })
   
});


module.exports = router;


