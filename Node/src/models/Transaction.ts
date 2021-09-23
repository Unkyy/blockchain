import { OutputType } from "./Output";
import unspentTransactions from "./UnspentTransactions";
import { getHash } from "./Wallet";

import crypto from "crypto";

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
    static validTransaction(transaction: Transaction): boolean {
        const unspentTransacts = unspentTransactions.getTransactions()
        for(let i = 0; i<transaction.inputs.length; i++){
            const input = transaction.inputs[i];
            const output = transaction.outputs[i];
            const unspentTransact = unspentTransacts
                .find(transactions => transactions.hash === input.txHash);
            if(unspentTransact === undefined) return false
            const unspentOutput = unspentTransact.outputs[input.indexOutput];
            if(unspentOutput === undefined) return false;
            if(unspentOutput.amount < input.amount) return false;
            let result = output.amount;
            if(unspentOutput.amount > input.amount){
                const nextOutput = transaction.outputs[i+1];
                result += nextOutput.amount;
            }
            if(result !==  unspentOutput.amount) return false;
            const sign = input.scriptSig;
            //add address verification
            if(!output.publicKey) return false;
            const address = getHash(output.publicKey);
            if(input.address !== address) return false;
            if(sign === undefined) return false;
            delete input.scriptSig
            const hash = getHash(JSON.stringify([input,output]))

            const isVerified = crypto.verify(
                'RSA-SHA256',Buffer.from(hash, 'utf8'),
                output.publicKey,Buffer.from(sign, 'base64')
            )
            input.scriptSig = sign
            if(!isVerified) return false
        }
        return true
    }
}
