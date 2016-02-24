var express = require('express');
var router = express.Router();
var post;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*Post*/
router.post('/',function(req,res){
  post=req.body.data;
  console.log("Post:" + post);
  
//data
var seedData = JSON.parse(post);

console.log("seedData:" + seedData);
  
//test mongo db conn
//DB Mongo connection
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://hpmakers:TphLRSAgF4C5jcCG@ds057862.mongolab.com:57862/hpmakers_test", function (err, db) {
    if (err)
    {
        console.log("MongoClient.connect Error: " + err)
        throw err;
    }
    else
    {
        console.log("successfully connected to the database");
        var collection = db.collection('Test1');
        collection.insert(seedData, function(err, result)
        {
            if(err)
            {
                db.close();
                console.log("collection.insert Error: " + err);
                throw err;
            }
            console.log('Inserted into the collection');
            console.log(result);
        });
    }
    db.close();
});  
  res.end("yes");
});

module.exports = router;
