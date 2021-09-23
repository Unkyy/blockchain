import { IncomingMessage, ServerResponse } from "http"
import { Client } from "../core/Client"
import { Transaction } from "../models/Transaction"
import { TransactionRequest } from "../models/TransactionRequest"
import transactionPool from "../models/TransationPool"
import UnspentTransactions from "../models/UnspentTransactions"
const util = require('util')


export const transactionCreateController = async (req: IncomingMessage, res: ServerResponse, client: Client) => {
    req.on('data',(chunk: Buffer) => {
        const data = JSON.parse(chunk.toString())
        data.amount =  parseFloat(data.amount)
        const transaction = new TransactionRequest(data)
        if(transactionPool.addTransaction(transaction)){
            UnspentTransactions.transactionSpend(transaction)
            client.sendAllPeer(transaction,"/transaction/transfer")
        }
    })
    res.end()
}

export const transactionTransferController = async (req: IncomingMessage, res: ServerResponse, client: Client) => {
    req.on('data',(chunk: Buffer) => {
        console.log('getransaction')
        const transaction: Transaction = JSON.parse(chunk.toString())
        if(transactionPool.addTransaction(transaction)){
            console.log("get")
            UnspentTransactions.transactionSpend(transaction)
            client.sendAllPeer(transaction,"/transaction/transfer")
        }
    })
    res.end()
}
export const getTransactionController = async (req: IncomingMessage, res: ServerResponse, client: Client) => {
    res.write(JSON.stringify(transactionPool))
    res.end()
}