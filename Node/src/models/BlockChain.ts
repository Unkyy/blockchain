import { Block } from "./Block"

export class BlockChain {
    blocks: Array<Block> = []
    constructor(){}
    mergreBlock(blockvhain: BlockChain){

    }
    blocksVerify(){

    }
    getLastBlock(){
        return this.blocks[this.blocks.length -1]
    }
    getAllBlock():Array<Block>  {
        return this.blocks
    }
}

export const blockChain = new BlockChain()