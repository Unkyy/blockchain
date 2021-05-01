import { type } from "os"
import { Transaction } from "./Transaction"

class TransactionPool {
    private transactions: Array<Transaction> = []
    constructor(){
    }
    private validTransaction(transaction: Transaction): boolean{
        
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
        this.transactions = []
    }
    private pushTransation(transaction: Transaction){
        const require = ["amount","user","password","hash","datetime"]
        //console.log('------',transaction.getKey)
        this.transactions.push(transaction);
    }
}
export default new TransactionPool()
