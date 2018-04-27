

// 用户加入购物车的方法  如果减少成功 1 失败 0 商品没有了 2
const reduce = (params,cb)=>{
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
            if(err) throw err;  
            let result = null          
            let goods = docs[0].goods
            
            for(var i =0;i<goods.length;i++){
                if(goods[i].goodid==params.goodid){
                    //找见商品把数量-1
                    goods[i].num--;
                    if(goods[i].num<=0){
                        console.log('222222222222')
                        //如果减完后商品没有
                        goods.splice(i,1)
                        result = 2
                    }
                    break;
                }
            }

            collection.update({username:params.username},{$set:{goods:goods}},(err,results)=>{
                if(err){
                    result = 0
                    cb(result)
                    return ;
                }
                result = result==2?result:1
                cb(result)
                db.close();
            })
            
        }); 

        
    });
}
module.exports = reduce


//socket 