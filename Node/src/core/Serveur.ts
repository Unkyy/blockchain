import { Client } from "./Client";

import * as http from 'http';
import { IncomingMessage, ServerResponse } from "http";
import { blockChain} from "../models/BlockChain";
import { Minning } from "../models/Minning";
import { Block } from "../models/Block";
import {EventEmitter} from "events"
import pendingTransation from "../models/pendingTransation";
import { blockChainController } from "../controller/blockchain";
import { transactionController } from "../controller/transaction";

export class Serveur{
    minning = false;
    port: number
    client: Client
    //blockchain: BlockChain = new BlockChain()
    constructor(port:number, client: Client){
        this.port = port;
        //console.log('constructor',client)
        this.client = client
        this.handleminning()
    }
    App(){
        const emitter = new EventEmitter()
        http.createServer((req: IncomingMessage, res: ServerResponse) => {
            res.setHeader('Access-Control-Allow-Origin','*')
            req.on('error', (err) => {
                console.log('server error:', err)
            })
            const url = req.url ? req.url.split('/') : ""
            console.log('->>>',url)
            if(url ===""){
                res.statusCode = 404;
                res.end("404 Not Found");
            }
            else if(req.method === "OPTIONS"){
                res.setHeader('Acces-Control-Allow-Headers', 'Accept, Content-Type')
            }
            else if(url[1] === "blockchain"){
                emitter.emit('blockchain',req, res,this.client)
            }
            else if(url[1] === "transaction"){
                emitter.emit('transaction',req, res,this.client)
            }else {
                res.statusCode = 404;
                res.end("404 Not Found");
            }
        })
        .listen(this.port,()=> console.log("running on  port : " + this.port))
        return emitter
    }
    launch()  {
        const app = this.App()
        app.on('blockchain',blockChainController)
        app.on('transaction',transactionController)
    }
    async handleminning(){
        while(true){
            const minning = await new Minning().findHash()
            blockChain.addBlock(minning)
            this.client.sendAllPeer(minning,'/blockchain')
        }
    }
}