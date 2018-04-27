module.exports = (username,callback)=>{

    //如果用户没有登陆
    if(username==''){
        callback('not login')
        return ;
    }
    
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/web_server';
    MongoClient.connect(url, function(err, db) {
        if(err) throw err; 
        var collection = db.collection('cars');
        collection.find({username:username}).toArray(function(err, docs) {
            if(err) throw err;
            //用户没有买过东西导致没有他的document
            if(docs.length==0){
                callback('not buy')
                db.close();
            }else{
                // {username:'',goods:[{goodid:'1',num:1}]}
                //根据得到的此用户购物车的信息去查找里面每一个商品的详细信息
                let car_goods = docs[0].goods
                let goods_coll = db.collection("goods")
                goods_coll.find({}).toArray((err,all_goods)=>{
                    let results = []

                    all_goods.forEach((good,i)=>{
                        car_goods.forEach((_good,i)=>{
                            if(good.goodid ==_good.goodid){
                                good.num = _good.num
                                results.push(good)
                            }
                        })
                    })
                    callback(results)  
                    db.close();
                })
                 
            }            
        });
         
        // db.close();
      });
}