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
                //res.writeHead(200, { 'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Origin': 'localhost:5000','Content-Type': 'application/json' });
                //res.writeHead('Access-Control-Request-Method', '*');
                res.setHeader('Access-Control-Allow-Origin','*')
                if(req.method === "OPTIONS"){
                    res.setHeader('Acces-Control-Allow-Headers', 'Accept, Content-Type')
                }
                req.on('data',(chunk: Buffer) => {
                    console.log('server',chunk.toString())
                })
                res.write(JSON.stringify({"test": 10}))
                res.end()
            })
            .listen(this.port,()=> res(console.log("running on  port : " + this.port)))

        })
    }
}