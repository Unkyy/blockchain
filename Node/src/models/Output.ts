export type OutputType = {
    outPutAddress: string
    amount: number
    toAddress: string
    publicKey: string
}
export class Output {
    outPutAddress: string
    amount: number
    toAddress: string
    publicKey: string
    constructor(arg: OutputType){
        this.outPutAddress = arg.outPutAddress 
        this.amount = arg.amount
        this.toAddress = arg.toAddress
        this.publicKey = arg.publicKey
    }
    gettest(){
        return 0
    }
}