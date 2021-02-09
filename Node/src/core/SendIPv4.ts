import { NodeServerConnection } from "../connections/NodeServerConnection";
import { PeerList } from "./PeersList";

const { networkInterfaces } = require('os');
const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object

export class SendIPv4 {
    private ipv4 :any = [];
    private nodeServeur:NodeServerConnection = new NodeServerConnection();
    constructor(){
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
       this.ipv4 = results;
    }
    async send(){
        const test = {...this.ipv4};
        const data = {
            IP: test.eth0[0].address
        };
        const nodelist = await this.nodeServeur.send(data);
        return new Promise(res => {
            res(new PeerList(nodelist));
        })
    }
}