import { createHash } from "crypto";
import { Block } from "./Block";
import { blockChain } from "./BlockChain";
import { TransactionReward } from "./TransactionReward";
import transationPool from "./TransationPool";
import  wallet  from "./Wallet";


const timer = (ms: any) => new Promise(res => setTimeout(res, ms))
const howManyZero = (howManyZero = 3) => {
    let zero = [];
    for(let i =0; i < howManyZero; i++){
        zero.push("0")
    }
    return zero.join('')
}

export class Mining {
    block: Block;
    static zero: string = howManyZero();
    constructor(){
        this.block = new Block(new Date,"0")
        this.block.miner = createHash('sha256').update(wallet.getRandPublicKey()).digest("hex");    
    }
    async findHash(){
        this.block.preHash  =  blockChain.getLastBlock().hash ? blockChain.getLastBlock().hash : "0"
        let hash = createHash('sha256').update(JSON.stringify(this.block)).digest("hex");
        const output = {
            amount: this.block.reward,
            toAddress: this.block.miner,
            publicKey:""
        }
        transationPool.addTransaction(new TransactionReward(output))
        //console.log(transationPool)
        while(!Mining.validHash(hash)){
            this.block.blockReward()
            this.block.incrementNonce()
            this.block.transactions = transationPool.getTransactionPool()
            hash = createHash('sha256').update(JSON.stringify(this.block)).digest("hex");
            await timer(10)
            //console.log(this.block)
            //console.log(hash)
        }
        console.log(this.block.reward)
        transationPool.resetTransactionPool()
        this.block.hash = hash
        return this.block
    }
    static validHash(hash: string){
        return hash.substring(0,Mining.zero.length)
        .includes(Mining.zero)
    }
}
