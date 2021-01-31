let http = require('http');
const { networkInterfaces } = require('os');

const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object


for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net);
        }
    }
}

class Serveur{

    port: number
    constructor(port:number, ){
        this.port = port;
    }
    launch(){
        http.createServer((req: any, res: any) => {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.writeHead(200, { 'Content-Type': 'application/json' });
            var body:any = []
            req.on('data', (chunk: any) => body.push(chunk))
                .on('end', () => {
                    let data = JSON.parse(Buffer.concat(body).toString());
                    console.log(data);
                    console.log(data.origin);
                    console.log(results);
                    res.end()
                })
                .on('close',() => {})        
        })
        .listen(this.port)
        .on('error', (e: any) => console.log(`server error: ${e}`))
    }
}
 
const test = new Serveur(5000).launch();