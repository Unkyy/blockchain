import { type } from "os"
import { Transaction } from "./Transaction"
import unspentTransactions from "./UnspentTransactions";

class TransactionPool {
    private transactions: Array<Transaction> = []
    validTransaction(transaction: Transaction): boolean{
        const unspentTransacts = unspentTransactions.getTransactions()
        for(let i = 0; i<transaction.inputs.length; i++){
            const indexOutput = transaction.inputs[i].IndexOutput
            const txHash = transaction.inputs[i].txHash
            const unspentTransact = unspentTransacts
                .find(transactions => transactions.hash === txHash)
            if(unspentTransact === undefined) return false
            const output = unspentTransact.outputs
            if(output === undefined) return false


        }
        return true
    }
    addTransaction(transaction: Transaction): boolean{
        if(this.transactions.some(elem => elem.hash === transaction.hash)){
            return false; 
        }
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
