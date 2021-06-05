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
        console.log(transaction)
        if(transactionPool.addTransaction(transaction)){
            client.sendAllPeer(transaction,"/transaction")
        }
    })
    //res.write(JSON.stringify(pendingTransation.getTransaction()))
    res.end()
}


