import { PeerList } from "./PeersList";
let http = require('http');

export class Client {
    private peerList: Promise<PeerList>;
    constructor(peerList: Promise<PeerList>){
        this.peerList = peerList;
    }
    async connectPeer(){
        var options = {
            host: '127.0.0.1',
            port: 80,
            path: '/upload',
            method: 'POST'
          };
        const list = await this.peerList;
        console.log('------',typeof list.getPeers())
        const connects = list.getPeers().map((elem:any) =>{
            ({
                host: elem.IP,
                port: 80,
                path: '/upload',
                method: 'POST'
            })
        })
        console.log(connects);
        /**
         *  var req = http.request(options, (res:any) => {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', (chunk: any) => {
              console.log('BODY: ' + chunk);
            });
          });
         */
    }
}