import { Client } from "./Client";

import * as http from 'http';
import { IncomingMessage, ServerResponse } from "http";
import { blockChain} from "../models/BlockChain";
import { Mining } from "../models/Mining";
import {EventEmitter} from "events"
import { blockChainController, getBlockChainController } from "../controller/blockchain";
import { transactionCreateController, transactiontransferController } from "../controller/transaction";

export class Serveur{
    mining = false;
    port: number
    client: Client
    //blockchain: BlockChain = new BlockChain()
    constructor(port:number, client: Client){
        this.port = port;
        //console.log('constructor',client)
        this.client = client
        this.handlemining()
    }
    App(){
        const emitter = new EventEmitter()
        http.createServer((req: IncomingMessage, res: ServerResponse) => {
            res.setHeader('Access-Control-Allow-Origin','*')
            req.on('error', (err) => {
                console.log('server error:', err)
            })
            const url = req.url ? req.url.split('/') : ""
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
            else if(url[1] === "transaction" && url[2] ==="create"){
                emitter.emit('transaction/create',req, res,this.client)
            }
            else if(url[1] === "transaction" && url[2] ==="transfer"){
                emitter.emit('transaction/transfer',req, res,this.client)
            }
            else if(url[1] === "blockchain" && url[2] ==="get"){
                emitter.emit('transaction/get',req, res,this.client)
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
        app.on('transaction/create',transactionCreateController)
        app.on('transaction/transfer',transactiontransferController)
        app.on('transaction/get',getBlockChainController)
    }
    async handlemining(){
        while(true){
            const block = await new Mining().findHash()
            blockChain.addBlock(block)
            //console.log(block)
            this.client.sendAllPeer(block,'/blockchain')
        }
    }
}