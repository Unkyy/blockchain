import { createHash } from "crypto";
import { copyFile } from "fs";
import { Block } from "./Block";
import { blockChain } from "./BlockChain";
import  wallet  from "./Wallet";


const timer = (ms: any) => new Promise(res => setTimeout(res, ms))
const howManyZero = (howManyZero = 3) => {
    let zero = [];
    for(let i =0; i < howManyZero; i++){
        zero.push("0")
    }
    return zero.join('')
}

export class Minning {
    block: Block;
    static zero: string = howManyZero();
    constructor(){
        this.block = new Block(new Date,"0")
        this.block.miner = createHash('sha256').update(wallet.getPublicKey()).digest("hex");
        if(blockChain.length() > 0){
            let year = new Date(blockChain.getFirstBlock().date).getFullYear()
            let yeaNow = new Date().getFullYear()
            this.block.reward /=  Math.pow(2, year - yeaNow)
        }       
    }
    async findHash(){
        this.block.preHash  =  blockChain.getLastBlock().hash ? blockChain.getLastBlock().hash : "0"
        let hash = createHash('sha256').update(JSON.stringify(this.block)).digest("hex");
        
        while(!Minning.validHash(hash)){
            this.block.incrementNonce()
            hash = createHash('sha256').update(JSON.stringify(this.block)).digest("hex");
            await timer(10)
            
            //console.log(this.block)
            //console.log(hash)
        }
        this.block.hash = hash
        return this.block
    }
    static validHash(hash: string){
        return hash.substring(0,Minning.zero.length)
        .includes(Minning.zero)
    }
}
