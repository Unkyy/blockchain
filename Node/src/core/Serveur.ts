let http = require('http');

export class Serveur{

    port: number
    constructor(port:number, ){
        this.port = port;
    }
    
    launch(): Promise<void>{
        return new Promise(res => {
            http.createServer((req: any, res: any) => {
                res.setHeader('Access-Control-Allow-Origin', '*')
                res.writeHead(200, { 'Content-Type': 'application/json' });
                var body:any = []
                req.on('data', (chunk: any) => body.push(chunk))
                    .on('end', () => {
                        let data = JSON.parse(Buffer.concat(body).toString());
                        console.log(data);
                        res.end()
                    })
                    .on('close',() => {})        
            })
            .listen(this.port,()=> res(console.log("running on  port : " + this.port)))
            .on('error', (e: any) => console.log(`server error: ${e}`))
        })
    }
}