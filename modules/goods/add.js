

// 用户加入购物车的方法
const add = (params,cb)=>{
    //创建和数据库连接相关的配置信息
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/web_server';
    
    //连接数据库
    MongoClient.connect(url, function(err, db) {
        let num = params.num?parseFloat(params.num):1
        if(err) throw err; 
        //获取cars（存的是用户们的购物车信息）表
        var collection = db.collection('cars');
        //先去查找有没有这个用户的购物车信息
        collection.find({username:params.username}).toArray(function(err, docs) {
            
            if(docs.length){
                //此用户有购物车数据，直接操作
                console.log('此用户有购物车数据，直接操作')
                //用户此时的购物数据
                let _goods = docs[0].goods
                let isHas = false
                //如果用户购物信息里有这个商品
                for(var i =0;i<_goods.length;i++){
                    if(_goods[i].goodid==params.goodid){
                        _goods[i].num+=num;
                        isHas=true
                        break;
                    }
                }
                if(!isHas){
                    //如果没有这个商品，加入这条商品
                    _goods.push({goodid:params.goodid,num}) 
                }
                //对数据collection里的数据进行更新
                collection.update({username:params.username},{$set:{goods:_goods}},(err,results)=>{
                    if(err){
                        cb(1)
                        return ;
                    }
                    cb(0)
                    db.close();
                })

            }else{
                //先去为此用户创建一个购物车的信息
               
                collection.insertMany([{
                    username:params.username,
                    goods:[{goodid:params.goodid,num}]
                }], function(err, result) {
                    if(result.insertedCount==1){
                        cb(0)
                    }else{
                        cb(1)
                    }
                    db.close();
                }); 
            }
        }); 

        
    });
}
module.exports = add


//socket 