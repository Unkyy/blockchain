import { IncomingMessage, ServerResponse } from "http"
import { Client } from "../core/Client"
import { Block } from "../models/Block";
import { BlockChain, blockChain } from "../models/BlockChain"


export const blockChainController = async (req: IncomingMessage, res: ServerResponse, client: Client) => {
    let body: any = [];
    req.on('data', (chunk ) => {
        body.push(chunk);
    })
    req.on('end', () => {
        body = Buffer.concat(body).toString();
        const data: Block = JSON.parse(body)
        if(blockChain.mergreBlock(data)){
            client.sendAllPeer(data,"/blockchain")
        }
    });
    req.on('error', (e) =>{ console.log(e) });

    //res.write(JSON.stringify(JSON.stringify(blockChain)))
    res.end()
}

export const getBlockChainController = async (req: IncomingMessage, res: ServerResponse, client: Client) => {
    res.write(JSON.stringify(blockChain))
    res.end()
}