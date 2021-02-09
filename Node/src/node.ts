import { Serveur } from "./core/Serveur";
import { SendIPv4 } from "./core/SendIPv4";

let tetetee = new SendIPv4()
const fefeef = tetetee.send();
const test = new Serveur(5000).launch();
(async ()=>{
    console.log('-------',await fefeef);
})()