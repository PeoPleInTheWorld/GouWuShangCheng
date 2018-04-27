

// Use connect method to connect to the Server



module.exports = (params,success,faile)=>{
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/web_server';
    MongoClient.connect(url, function(err, db) {
        if(err) throw err; 
        var collection = db.collection('user');
        collection.find({username:params.username,password:params.password}).toArray(function(err, docs) {
            if(docs.length){
                
                success(docs[0])
            }else{
                faile()
            }
        }); 
        db.close();
      });
}