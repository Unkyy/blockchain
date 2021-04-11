type OutputType = {
    outPutAddress: string
    amount: number
    toAddress: string
    publicKey: string
    inputAddress: string
}
export class Output {
    outPutAddress: string
    amount: number
    toAddress: string
    publicKey: string
    inputAddress: string
    constructor(arg: OutputType){
        this.outPutAddress = arg.outPutAddress
        this.amount = arg.amount
        this.toAddress = arg.toAddress
        this.publicKey = arg.publicKey
        this.inputAddress = arg.inputAddress
    }
}