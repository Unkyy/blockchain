import { Transaction } from "./Transaction";

export class Block {
    datetime: Date;
    hash: string = '';
    preHash: string;
    nonce: number = 0;
    transactions: Array<Transaction> = [];
    miner: string = ""
    reward: number = 50;
    constructor(datetime: Date , preHash: string){
        this.datetime = datetime;
        this.preHash = preHash;
    }
    
    incrementNonce(){
        this.nonce++
    }
}
