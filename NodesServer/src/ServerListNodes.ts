const express = require('express')
const app = express()
const {MongoClient} = require('mongodb');
const url = 'mongodb://root:root@mongodb:27017';
const dbName = 'halgo';
let db: any;
let nodesCollection: any;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

MongoClient.connect(url, function(err: any, client: any) {
  console.log("Connected successfully to server");
  db = client.db(dbName);
  nodesCollection = db.collection("nodes");
});

app.post('/',async (req: any, res: any) => {
    const result = await nodesCollection.update(req.body,req.body, { upsert: true });
    console.log('---------',req.body)
    const data = nodesCollection.find({})
    //if(data.include())
    data.toArray(function(err:any, nodesCollection:any) {
        if (err) throw err;
        res.send(nodesCollection);
    });
})
app.listen(9001);