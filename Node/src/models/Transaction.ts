import { Input } from "./Input";
import { Output } from "./Output";

type TransactionType = {
    inputs: Array<Input>;
    outputs: Array<Output>;
    hash: string;
    TotalInput: string;
    TotalOutput: string;
}

export type TransactionRequest = {
    amount: number;
    toAddress: string;
}
export type InputOutputType = {
    inputs: Array<Input>;
    outputs: Array<Output>;
}
export class Transaction {
    hash?: string;
    inputs: Array<Input>;
    outputs: Array<Output>;
    datetime: Date;
    constructor(arg: InputOutputType)
    {
        this.outputs = arg.outputs;
        this.inputs = arg.inputs;
        this.datetime = new Date();  
        // console.log(this)
        // console.log(this.test())
    }
    // test(){
    //     return this.amount + this.amount
    // }
}
