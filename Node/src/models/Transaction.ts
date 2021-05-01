import { Input } from "./Input";
import { Output, OutputType } from "./Output";
import { getHash } from "./Wallet";
type TransactionType = {
    inputs: Array<Input>;
    outputs: Array<OutputType>;
    hash: string;
    TotalInput: string;
    TotalOutput: string;
}



export class Transaction {
    hash: string;
    inputs: Array<Input>;
    outputs: Array<OutputType>;
    datetime: Date;
    constructor(inputs: Array<Input>, outputs: Array<OutputType>)
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


