import { IncomingMessage, ServerResponse } from "http"
import { Client } from "../core/Client"
import { TransactionRequest } from "../models/TransactionRequest"
import transactionPool from "../models/TransationPool"
const util = require('util')


export const transactionController = async (req: IncomingMessage, res: ServerResponse, client: Client) => {
    req.on('data',(chunk: Buffer) => {
        const data = JSON.parse(chunk.toString())
        //console.log(req.rawHeaders[1].split(':')[0])
        //console.log(req.rawHeaders)
        //
        data.amount =  parseFloat(data.amount)
        const transaction = new TransactionRequest(data)
        transactionPool.addTransaction(transaction)
        console.log('-->>',util.inspect(transactionPool, {showHidden: false, depth: null}))
        //const test = new Transaction(data)
        //if(pendingTransation.addTransaction(data)){
            //pendingTransation.setTransation(data)
            //client.sendAllPeer(data, "/transaction")
            //console.log(pendingTransation.getTransaction())
        //}
    })
    //res.write(JSON.stringify(pendingTransation.getTransaction()))
    res.end()
}


