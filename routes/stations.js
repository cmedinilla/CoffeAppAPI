var express = require('express');
var router = express.Router();
var post;
var idBerry;
var hostname;
var nodeName;
var temp;
var timeStamp;

/* GET users listing. */
router.get('/list', function(req, res, next) {   
  //DB Mongo connection
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect("mongodb://hpmakers:TphLRSAgF4C5jcCG@ds057862.mongolab.com:57862/hpmakers_test", function (err, db) {
    if (err)
    {
        console.log("MongoClient.connect Error: " + err)
        return res.send(500, err.message + "- Error in: " + db)
    }
    else
    {
        console.log("successfully connected to the database");
        var collection = db.collection('Test1');
            collection.find({},{},function(e,docs){
            console.log(docs)
            res.json(docs);
        });
    }
  });    
});

/*Post*/
router.post('/',function(req,res){
  //post=req.body.data;
  idBerry=req.body.idBerry;
  hostname=req.body.hostname;
  nodeName=req.body.nodeName;
  temp=req.body.temp;
  timeStamp=req.body.timeStamp;
  
  console.log("idBerry:" + idBerry);
  console.log("location:" + hostname);
  console.log("sensorId:" + nodeName);
  console.log("temp:" + temp);
  console.log("timeStamp:" + timeStamp);
  
  post = '{"idBerry":' + idBerry + ',' + '"location":"' + hostname + '",' + '"sensorId":"' + nodeName + '",' + '"temp":' + temp + ',' + '"timeStamp":"' + timeStamp + '"}';
  
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
            db.close();
        });
    }
});  
  res.end("201");
});

module.exports = router;
