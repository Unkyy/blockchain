import { OutputType } from "./Output";
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
    constructor(
        inputs: Array<InputType>, 
        outputs: Array<OutputType>,
        datetime?: Date,
        hash?: string)
    {
        this.inputs = inputs;
        this.outputs = outputs;
        this.datetime = datetime ? datetime : new Date() ;
        this.hash = hash ? hash : getHash(JSON.stringify(this));
        return this
    }
}
