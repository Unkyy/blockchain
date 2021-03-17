import { Transaction } from "./Transaction";

export class Block {
    date: Date;
    hash: String = '';
    preHash: String;
    nonce: number = 0;
    transactions: Array<Transaction> = [];
    constructor(date: Date , preHash: string){
        this.date = date;
        this.preHash = preHash;
    }
    incrementNonce(){
        this.nonce++
    }
}

