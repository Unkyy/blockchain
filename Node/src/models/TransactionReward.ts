import { Output, OutputType } from "./Output";
import { Transaction } from "./Transaction";

export class TransactionReward extends Transaction {

    constructor (outputs: OutputType){
        super([],[outputs])
        //console.log(this)
    }
    
}