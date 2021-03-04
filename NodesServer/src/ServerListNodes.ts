import express from 'express';
const app = express()
import { MongoClient, MongoError } from 'mongodb';
const url = 'mongodb://test:test@mongodb:27017';
const dbName = 'halgo';
let database: any;
let nodesCollection: any;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

  MongoClient.connect(url, (err: MongoError, client: MongoClient) =>{
    err ? console.log(err) : console.log('connected');
    database = client.db(dbName);
    nodesCollection = database.collection("nodes");
  });


app.post('/',async (req: any, res: any) => {
    const result = await nodesCollection.update(req.body,req.body, { upsert: true });
    //console.log('---------',req.body)
    const data = nodesCollection.find({})
    //if(data.include())
    data.toArray(function(err:any, nodesCollection:any) {
        if (err) throw err;
        res.send(nodesCollection);
    });
})
app.listen(9001);