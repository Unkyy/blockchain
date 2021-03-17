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
        console.log('constructor',client)
        this.client = client
    }
    App(){
        const emitter = new EventEmitter()
        http.createServer((req: IncomingMessage, res: ServerResponse) => {
            res.setHeader('Access-Control-Allow-Origin','*')
            req.on('error', (err) => {
                console.log('server error:', err)
            })
            if(req.method === "OPTIONS"){
                res.setHeader('Acces-Control-Allow-Headers', 'Accept, Content-Type')
            }
            if(req.url === "/blockchain"){
                emitter.emit('blockchain',req, res,this.client)
            }
            if(req.url === "/transaction"){
                emitter.emit('transaction',req, res,this.client)
            }
            console.log(req.url)
        })
        .listen(this.port,()=> console.log("running on  port : " + this.port))
        return emitter
    }
    launch()  {
        const app = this.App()
        app.on('blockchain',blockChainController)
        app.on('transaction',transactionController)
    }
}