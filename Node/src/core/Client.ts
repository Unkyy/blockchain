import { IPv4 } from "./IPv4";
import { PeerList } from "./PeersList";
import * as http from 'http';


export class Client {
    private peerList: Promise<PeerList>;
    private peerConnection:any = [];
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
                    'Content-Type': 'application/json',
                    "cache-control": "no-cache",       
                    "mode": 'cors',
                }
            }
        })
        const ip = new IPv4().getIp()
        connects = connects.filter(elem => elem.host != ip)

        connects.forEach(options => {
            const req = http.request(options,(res) => {
                res.setEncoding('utf8')
                res.on('finish',() => {
                    console.log('--------------')
                })
                res.on('data',(chunk: Buffer) => {
                    console.log(chunk.toString())
                })
            });
            req.write("dedede")
            req.end()
            //this.peerConnection.push(req)
        })
        await Promise.all(this.peerConnection);
        return this;
    }
    async updateBlockChain(blockChain: any){
        this.peerConnection.forEach((req: any )=> {
            console.log(blockChain)
            req.write(JSON.stringify(blockChain));
            req.on('error', (err: any) => {
                console.log('error : ', err);
            });  
        })
    }
}