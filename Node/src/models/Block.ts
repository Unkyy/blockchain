import { blockChain } from "./BlockChain";
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
    blockReward() {
        if(blockChain.length() > 0){
            let year = new Date(blockChain.getFirstBlock().datetime).getFullYear()
            let yeaNow = new Date().getFullYear()
            this.reward /=  Math.pow(2, year - yeaNow)
        }   
    }
}
