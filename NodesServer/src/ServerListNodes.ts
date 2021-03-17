import express from 'express';
const app = express()
import { MongoClient, MongoError } from 'mongodb';
import * as http from 'http';

const url = 'mongodb://test:test@mongodb:27017';
const dbName = 'halgo';
let database: any;
let nodesCollection: any;

const options = {
  method: "POST",
  host: null,
  port: 5000,
  headers: {
      'Content-Type': 'application/json',
      "cache-control": "no-cache",       
      "mode": 'cors',
  }
}

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

  MongoClient.connect(url, (err: MongoError, client: MongoClient) =>{
    err ? console.log(err) : console.log('connected');
    database = client.db(dbName);
    //nodesCollection.drop()
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
app.post('/peerDisconected',async (req: any, res: any) => {
  const body = req.body
  if(body.ip){
    options.host = body.ip
    const req = http.request(options,(res) => {
      res.setEncoding('utf8')
      });
    req.on('error', (err) => {
      nodesCollection.remove( { IP: { $eq: body.ip } }, true )
    })
    }
})
app.listen(9001);