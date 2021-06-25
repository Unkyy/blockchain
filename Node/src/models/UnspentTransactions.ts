import { blockChain } from "./BlockChain";
import { Transaction } from "./Transaction";

class UnspentTransactions {
    transactions: Array<Transaction> = []
    constructor(){

    }
    addTransactions(transactions:  Array<Transaction>){
        this.transactions = [...this.transactions, ...transactions];
    }
    getTransactions(){
        return this.transactions;
    }
    transactionSpend(transation: Transaction){
        transation.inputs.forEach(input => {
            const transactIndex = this.transactions
                .findIndex(elem =>{
                    return elem.hash === input.txHash
                })
            //if(transactIndex === -1) return
            this.transactions[transactIndex].outputs.splice(input.indexOutput)
        })
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