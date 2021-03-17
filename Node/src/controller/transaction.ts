import { IncomingMessage, ServerResponse } from "http"
import { Client } from "../core/Client"
import { blockChain } from "../models/BlockChain"
import { Minning } from "../models/Minning"
import pendingTransation from "../models/pendingTransation"


export const transactionController = async (req: IncomingMessage, res: ServerResponse, client: Client) => {
    req.on('data',(chunk: Buffer) => {
        const data = JSON.parse(chunk.toString())
        //console.log(req.rawHeaders[1].split(':')[0])
        //console.log(req.rawHeaders)
        //
        if(!pendingTransation.alreadySend(data)){
            pendingTransation.setTransation(data)
            client.sendAllPeer(data, "/transaction")
            //console.log(pendingTransation.getTransaction())
        }
    })
    res.write(JSON.stringify(pendingTransation.getTransaction()))
    res.end()
}