

// Use connect method to connect to the Server



module.exports = (params,success,faile)=>{
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/web_server';
    MongoClient.connect(url, function(err, db) {
        if(err) throw err; 
        var collection = db.collection('user');
        collection.find({username:params.username}).toArray(function(err, docs) {
            if(docs.length){
                faile()
                db.close();
            }else{
                collection.insertMany([params], function(err, result) {
                  if(result.insertedCount==1){
                      success()
                  }else{
                    faile()
                  }
                  db.close();
                }); 
            }
        }); 
        
    });
}