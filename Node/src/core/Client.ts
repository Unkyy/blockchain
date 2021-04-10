import { IPv4 } from "./IPv4";
import { PeerList } from "./PeersList";
import * as http from 'http';
import { BlockChain, blockChain } from "../models/BlockChain";
import { Block } from "../models/Block";


export class Client {
    private peerList: Promise<PeerList>;
    private peerConnection:any = [];
    constructor(peerList: Promise<PeerList>){
        this.peerList = peerList;
    }
    async sendAllPeer(data: any, path: string){
        const list = await this.peerList;
        let connects = list.getPeers().map((elem:any) =>{
            return {
                method: "POST",
                host: elem.IP,
                port: 5000,
                path: path,
                headers: {
                    'Content-Type': 'application/json',
                    "cache-control": "no-cache",       
                    "mode": 'cors',
                }
            }
        })
        const ip = new IPv4().getIp()
        connects = connects.filter(elem => elem.host != ip)

        const rep = connects.map(async(options) => {
            return new Promise<void>( resolve => {
                const req = http.request(options,(res) => {
                    res.setEncoding('utf8')
                    //res.on('error', () => {
                    //    console.log('error')
                    //})
                    res.on('finish',() => {
                        console.log('--------------')
                    })
                    res.on('data',(chunk: Buffer) => {
                       // console.log('----')
                        const data: Block = JSON.parse(chunk.toString())
                        blockChain.mergreBlock(data)
                        //console.log('client :  ',data)
                        //console.log('----')
    
                    })
                });
                req.on('error', (err) => {
                    const serveur = http.request({
                        method: "POST",
                        host: "nodeserver",
                        path: '/peerDisconected',
                        port: 9001,
                        headers: {
                            'Content-Type': 'application/json',
                            "cache-control": "no-cache",       
                            "mode": 'cors',
                        }},(res) =>{

                        })
                    serveur.on('error', error => {
                        console.error(error)
                      })              
                    serveur.write(JSON.stringify({ip:options.host}))
                    serveur.end()
                })
                
                req.write(JSON.stringify(data))
                req.end()
                resolve()
                this.peerConnection.push(req)
            })

        })
        return await Promise.all(rep);
    }
    // async updateBlockChain(){
    //     console.log(this.peerConnection)
    //     this.peerConnection.forEach((req: any )=> {
    //         console.log(blockChain)
    //         req.write(JSON.stringify(blockChain));
    //         req.on('error', (err: any) => {
    //             console.log('error : ', err);
    //         });  
    //     })
    // }
}