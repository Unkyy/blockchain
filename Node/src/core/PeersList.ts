export class PeerList {
    private peers: any = []
    constructor(peers: any){
        this.peers = peers;
    }
    getPeers(): Array<any> {
        return JSON.parse(this.peers);
    }
}