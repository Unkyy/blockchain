import { type } from "os"
import { Transaction } from "./Transaction"
import UnspentTransactions from "./UnspentTransactions";
import unspentTransactions from "./UnspentTransactions";
import { getHash } from "./Wallet";
const crypto = require("crypto");

class TransactionPool {
    private transactions: Array<Transaction> = []
    validTransaction(transaction: Transaction): boolean{
        const unspentTransacts = unspentTransactions.getTransactions()
        for(let i = 0; i<transaction.inputs.length; i++){
            const input = transaction.inputs[i];
            const output = transaction.outputs[i];
            const unspentTransact = unspentTransacts
                .find(transactions => transactions.hash === input.txHash)
            if(unspentTransact === undefined) return false
            const unspentOutput = unspentTransact.outputs[input.indexOutput]
            if(unspentOutput === undefined) return false
            if(unspentOutput.amount < input.amount) return false
            let result = output.amount;
            if(unspentOutput.amount > input.amount){
                const nextOutput = transaction.outputs[i+1]
                result += nextOutput.amount 
            }
            if(result !==  unspentOutput.amount) return false
            const sign = input.scriptSig
            //add address verification
            if(!output.publicKey) return false
            const address = getHash(output.publicKey)
            if(input.address !== address) return false
            if(sign === undefined) return false
            delete input.scriptSig
            const hash = getHash(JSON.stringify([input,output]))
            const isVerified = crypto.verify(
                'RSA-SHA256',Buffer.from(hash, 'utf8'),
                output.publicKey,Buffer.from(sign, 'base64')
            )
            if(!isVerified) return false
        }
        console.log('valid')
        console.log(this.transactions)
        UnspentTransactions.transactionSpend(transaction)
        return true
    }
    addTransaction(transaction: Transaction): boolean{
        if(this.validTransaction(transaction)){
            this.pushTransation(transaction)
            return true
        }
        return false;
    }
    getTransactionPool (): Array<Transaction>{
        return this.transactions
    }
    resetTransactionPool() {
        unspentTransactions.addTransactions(this.transactions)
        this.transactions = []
    }
    private pushTransation(transaction: Transaction){
        const require = ["amount","user","password","hash","datetime"]
        //console.log('------',transaction.getKey)
        this.transactions.push(transaction);
    }
}
export default new TransactionPool()
