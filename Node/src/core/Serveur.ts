import { Client } from "./Client";

import * as http from 'http';
import { IncomingMessage, ServerResponse } from "http";

export class Serveur{

    port: number
    constructor(port:number, ){
        this.port = port;
    }
    launch(client: Promise<Client>): Promise<void>{
    //launch(): Promise<void>{
        return new Promise(res => {
            http.createServer((req: IncomingMessage, res: ServerResponse) => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                var body:any = []
                req.on('data',(chunk: Buffer) => {
                    console.log('server',chunk.toString())
                })
                //res.write(JSON.stringify({"test": 10}))
                res.end(JSON.stringify({"test": 10}))
            })
            .listen(this.port,()=> res(console.log("running on  port : " + this.port)))

        })
    }
}