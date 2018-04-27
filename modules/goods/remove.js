

const remove = (params,cb)=>{
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
                let goods = docs[0].goods
                for(var i = 0;i<goods.length;i++){
                    if(goods[i].goodid==params.goodid){
                        goods.splice(i,1)
                    }
                }
                collection.update({username:params.username},{$set:{goods:goods}},(err,results)=>{
                    if(err){
                        cb(1)
                        return ;
                    }
                    cb(0)
                    db.close();
                })

        }); 

        
    });
}
module.exports = remove


//socket 