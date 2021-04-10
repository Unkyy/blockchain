type TransactionType = {
    inputs: Array<Input>;
    outputs: Array<Output>;
    hash: string;
    datetime: Date;
}
export class Transaction {
    amount: number;
    user: string;
    outputs: Array<Output>;
    inputs: Array<Input>;
    hash: string;
    datetime: Date;
    constructor(arg: Transaction)
    {
        this.amount = arg.amount;        
        this.user = arg.user;
        this.outputs = arg.outputs;
        this.inputs = arg.inputs;
        this.hash = arg.hash;        
        this.datetime = arg.datetime;       
        console.log(this)
        console.log(this.test())
    }
    test(){
        return this.amount + this.amount
    }
}
