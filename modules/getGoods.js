
//第一个参数为页码信息
module.exports = (params,callback)=>{
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/web_server';
    MongoClient.connect(url, function(err, db) {
        if(err) throw err; 
        var collection = db.collection('goods');

        // num=2 size=5  (num-1)*size+size
        //取数据的开始位置

        if(params.pageNum){
            let start = (params.pageNum-1)*params.pageSize
            collection.find({}).skip(start).limit(parseFloat(params.pageSize)).toArray(function(err, docs) {
                callback(docs)
            });
        }else{
            collection.find({goodid:parseFloat(params)}).toArray(function(err, docs) {
                callback(docs[0])
            });
        }
         
        db.close();
      });
}