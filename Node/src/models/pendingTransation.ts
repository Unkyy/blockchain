import { type } from "os"
import { Transaction } from "./Transaction"

class PendingTransation {
    private transaction: Array<Transaction> = []
    constructor(){
    }
    private verifTransaction(transaction: Transaction): boolean{
        return true
    }
    alreadySend(transaction: Transaction): boolean{
        if(this.transaction.length === 0){
            return false
        }
        return this.transaction.map(elem => JSON.stringify(elem)).includes(JSON.stringify(transaction))
    }
    getTransaction (): Array<Transaction>{
        return this.transaction
    }
    setTransation(transaction: Transaction){
        const require = ["amount","user","password","hash","datetime"]
        //console.log('------',transaction.getKey)
        this.transaction.push(transaction);
        //console.log(this.transaction)
    }
}
export default new PendingTransation()
