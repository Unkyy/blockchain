import { Block } from "./Block"
import { createHash } from "crypto";
import { Mining } from "./Mining";
import wallet from "./Wallet";

export class BlockChain {
    private blocks: Array<Block> = []
    constructor(){}
    mergreBlock(block: Block): Boolean{
        const blocks = blockChain.getAllBlock()
        //if(!blocks) return false;
        //if(blocks.length <= this.blocks.length) return false
        //this.blocks = blocks
        return this.addBlock(block)
        //return false
       // return true
    }
    findMatchIndex(){

    }
    blocksVerify(blockChain: BlockChain): boolean{
        const blocks = blockChain.getAllBlock()
        for (let i = blocks.length-1; i >= 0; i--) {
            const element = blocks[i];
            const verifElement = {...element}
            verifElement.hash = ''
            const posthash = blocks[i-1] ? blocks[i-1].hash : "0";
            const hash = createHash('sha256').update(JSON.stringify(verifElement)).digest("hex");
            if(posthash == "0" && i >0) return false
            if(element.hash != hash) return false;
            if(posthash !== element.preHash) return false
            if(!Mining.validHash(hash)) return false
        }
        return true;
    }
    validblock(block: Block){
        const element = block;
        const verifElement = {...block}
        verifElement.hash = ''
        const posthash = this.blocks[this.blocks.length-1] ? this.blocks[this.blocks.length-1].hash : "0";
        const hash = createHash('sha256').update(JSON.stringify(verifElement)).digest("hex");
        if(block.preHash == "0" && this.blocks.length >0) return false
        if(element.hash != hash) return false;
        if(posthash !== element.preHash) return false
        if(!Mining.validHash(hash)) return false
        //valider la reward
        console.log('valid')
        return true
    }
    addBlock(block: Block): boolean{
        if(!this.validblock(block)) return false
        this.blocks.push(block)
        console.log('block ',createHash('sha256').update(JSON.stringify(this.blocks)).digest("hex"));
        console.log(blockChain.length())
        wallet.getMoney()
        return true 
    }
    getLastBlock(){
        const block = this.blocks[this.blocks.length -1]
        return  block ? block : new Block(new Date, "0")
    }
    getFirstBlock(){
        return this.blocks[0]
    }
    getAllBlock():Array<Block>  {
        return this.blocks
    }
    length(): number{
        return this.blocks.length
    }
}

export const blockChain = new BlockChain()

