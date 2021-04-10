import { Transaction } from "./Transaction";

export class Block {
    date: Date;
    hash: string = '';
    preHash: string;
    nonce: number = 0;
    transactions: Array<Transaction> = [];
    miner: string = ""
    reward: number = 50;
    constructor(date: Date , preHash: string){
        this.date = date;
        this.preHash = preHash;
    }
    incrementNonce(){
        this.nonce++
    }
}
