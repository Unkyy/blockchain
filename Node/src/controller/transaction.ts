import { IncomingMessage, ServerResponse } from "http"
import { Client } from "../core/Client"
import { Transaction } from "../models/Transaction"
import { TransactionRequest } from "../models/TransactionRequest"
import TransationPool from "../models/TransationPool"
import transactionPool from "../models/TransationPool"
const util = require('util')


export const transactionCreateController = async (req: IncomingMessage, res: ServerResponse, client: Client) => {
    req.on('data',(chunk: Buffer) => {
        const data = JSON.parse(chunk.toString())
        data.amount =  parseFloat(data.amount)
        const transaction = new TransactionRequest(data)
        console.log(transaction)
        if(transactionPool.addTransaction(transaction)){
            client.sendAllPeer(transaction,"/transaction/transfer")
        }
    })
    res.end()
}

export const transactionTransferController = async (req: IncomingMessage, res: ServerResponse, client: Client) => {
    req.on('data',(chunk: Buffer) => {
        const data: Transaction = JSON.parse(chunk.toString())
        console.log('get')
        if(transactionPool.addTransaction(data)){
            console.log('good')
            client.sendAllPeer(data,"/transaction/transfer")
        }
    })
    res.end()
}
