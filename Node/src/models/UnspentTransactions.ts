import { blockChain } from "./BlockChain";
import { Transaction } from "./Transaction";

class UnspentTransactions {
    Transactions: Array<Transaction> = []
    constructor(){

    }
    addTransactions(transactions:  Array<Transaction>){
        this.Transactions = [...this.Transactions, ...transactions];
    }
    getTransactions(){
        return this.Transactions;
    }
    // getUnpentTransactions(){
    //     blockChain.getAllBlock().map(block => {
    //         block.transactions.map(transaction => {
    //             transaction.outputs.filter( output => {

    //             })
    //         })
    //     })
    // }
}

export default new UnspentTransactions();