import { IPv4 } from "./IPv4";
import { PeerList } from "./PeersList";
let http = require('http');

export class Client {
    private peerList: Promise<PeerList>;
    constructor(peerList: Promise<PeerList>){
        this.peerList = peerList;
    }
    async connectPeer(){
        const list = await this.peerList;
        let connects = list.getPeers().map((elem:any) =>{
            return {
                method: "POST",
                host: elem.IP,
                port: 5000,
                headers: {
                    "content-type": "application/json",
                    "cache-control": "no-cache",
                }
            }
        })
        const ip = new IPv4().getIp()
        connects = connects.filter(elem => elem.host != ip)

        setInterval(() => {
            connects.forEach(options => {
                var req = http.request(options, (req:any,res:any) => {
                    console.log('got connected!');
                    req.on('error', (err: any) => {
                        console.log('error: ');
                    });                  
                });
                //req.writeHead(200, { 'Content-Type': 'application/json' });
                req.write(JSON.stringify({test: 'test'}));
                req.end()
            })
        }, 2000)
    }
}