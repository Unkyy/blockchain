const express = require('express')
const app = express()
const {MongoClient} = require('mongodb');
const url = 'mongodb://root:root@localhost:27017';
const dbName = 'halgo';
let db: any;
let nodes: any;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

MongoClient.connect(url, function(err: any, client: any) {
  console.log("Connected successfully to server");
  db = client.db(dbName);
  nodes = db.collection("nodes");
});

app.post('/',async (req: any, res: any) => {
    const result = await nodes.insertOne(req.body);
    nodes.find({}).toArray(function(err:any, nodes:any) {
        if (err) throw err;
        res.send(nodes);
    });
})

app.listen(9001);