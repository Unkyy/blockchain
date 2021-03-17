import { createHash } from "crypto";
import { Block } from "./Block";
import { blockChain } from "./BlockChain";


const timer = (ms: any) => new Promise(res => setTimeout(res, ms))


export class Minning {
    block: Block;
    howManyZero: number;
    zero: string;
    constructor(howManyZero = 5){
        this.block = new Block(new Date,"0")
        this.howManyZero =  howManyZero
        let zero = [];
        for(let i =0; i < this.howManyZero; i++){
            zero.push("0")
        }
        this.zero = zero.join('')
    }
    async findHash(){
        this.block.preHash  =  blockChain.getLastBlock().hash ? blockChain.getLastBlock().hash : "0"
        let hash = createHash('sha256').update(JSON.stringify(this.block)).digest("hex");
        while(!this.validHash(hash)){
            hash = createHash('sha256').update(JSON.stringify(this.block)).digest("hex");
            this.block.incrementNonce()
            await timer(300)
        }
        return this.block
    }
    validHash(hash: String){
        return hash.substring(0,this.howManyZero)
        .includes(this.zero)
    }

}
