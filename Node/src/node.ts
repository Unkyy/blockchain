import { Serveur } from "./core/Serveur";
import { SendIPv4 } from "./core/SendIPv4";
import { PeerList } from "./core/PeersList";
import { Client } from "./core/Client";

let tetetee = new SendIPv4()
const peers = tetetee.send();
const test = new Serveur(5000).launch();
const client = new Client(peers).connectPeer();