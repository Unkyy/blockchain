import { IncomingMessage, ServerResponse } from "http"
import { Client } from "../core/Client"
import pendingTransation from "../models/PendingTransation"
import { Transaction } from "../models/Transaction"
import wallet from "../models/Wallet"


export const transactionController = async (req: IncomingMessage, res: ServerResponse, client: Client) => {
    req.on('data',(chunk: Buffer) => {
        const data = JSON.parse(chunk.toString())
        //console.log(req.rawHeaders[1].split(':')[0])
        //console.log(req.rawHeaders)
        //
        data.amount =  parseFloat(data.amount)
        console.log(wallet.CreateTransaction(data))
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


