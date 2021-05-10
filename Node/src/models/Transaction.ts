import { OutputType } from "./Output";
import unspentTransactions from "./UnspentTransactions";
import { getHash } from "./Wallet";


const util = require('util')
type TransactionType = {
    inputs: Array<InputType>;
    outputs: Array<OutputType>;
    hash: string;
    TotalInput: string;
    TotalOutput: string;
}



export class Transaction {
    hash: string;
    inputs: Array<InputType>;
    outputs: Array<OutputType>;
    datetime: Date;
    constructor(inputs: Array<InputType>, outputs: Array<OutputType>)
    {
        this.inputs = inputs;
        this.outputs = outputs;
        this.datetime = new Date();
        this.hash = getHash(JSON.stringify(this));
        return this
    }

    // test(){
    //     return this.amount + this.amount
    // }
}


