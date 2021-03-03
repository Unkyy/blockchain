import { Serveur } from "./core/Serveur";
import { IPv4 } from "./core/IPv4";
import { PeerList } from "./core/PeersList";
import { Client } from "./core/Client";

(async() => {
    let ipv4 = new IPv4()
    const peers = ipv4.send();
    const client = new Client(peers).connectPeer();
    const serveur = new Serveur(5000).launch(client);
    
})()
