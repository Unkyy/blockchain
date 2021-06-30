import { blockChain } from "./BlockChain";
import { Transaction } from "./Transaction";

class UnspentTransactions {
    transactions: Array<Transaction> = []
    constructor(){

    }
    addTransactions(transactions:  Array<Transaction>): boolean{
        const validTransations = transactions.some((transaction: Transaction) => Transaction.validTransaction(transaction));
        if(!validTransations) return false;
        console.log('transaction valid',validTransations)
        this.transactions = [...this.transactions, ...transactions];
        return true;
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
            if(transactIndex === -1) console.log("faux")
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