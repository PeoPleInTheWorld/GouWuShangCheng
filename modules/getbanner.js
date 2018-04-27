

// Use connect method to connect to the Server



module.exports = (callback)=>{
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/web_server';
    MongoClient.connect(url, function(err, db) {
        if(err) throw err; 
        var collection = db.collection('banner');
        collection.find({}).toArray(function(err, docs) {
            callback(docs)
        }); 
        db.close();
      });
}