import { IncomingMessage, ServerResponse } from "http"
import { Client } from "../core/Client"
import { blockChain } from "../models/BlockChain"


export const blockChainController = async (req: IncomingMessage, res: ServerResponse, client: Client) => {
    req.on('data',(chunk: Buffer) => {
        const data = JSON.parse(chunk.toString())
        //console.log(req.rawHeaders[1].split(':')[0])
        //console.log(req.rawHeaders)
        //this.client.updateBlockChain(data)
        if(blockChain.mergreBlock(data)){
            client.sendAllPeer(data,"/blockchain")
        }
        //console.log('serveur',data)
        //this.handleBlochain(data)
        //client.sendAllPeer(data,"/blockchain")

    })

    //res.write(JSON.stringify(JSON.stringify(blockChain)))
    res.end()
}