import { type } from "os"
import { Transaction } from "./Transaction"
import UnspentTransactions from "./UnspentTransactions";
import unspentTransactions from "./UnspentTransactions";
import { getHash } from "./Wallet";
const crypto = require("crypto");

class TransactionPool {
    private transactions: Array<Transaction> = []
    addTransaction(transaction: Transaction): boolean{
        if(Transaction.validTransaction(transaction)){
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
        this.transactions.push(transaction);
    }
}
export default new TransactionPool()


