import { OutputType } from "./Output";
import { Transaction } from "./Transaction";
import { getHash } from "./Wallet";

export class TransactionReward extends Transaction {

    constructor (outputs: OutputType){
        super([],[outputs])
        //console.log(this)
    }
    
}