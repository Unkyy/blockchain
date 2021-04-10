type InputType = {
    preOutPut: string
    amount: number
    fromAddress: string
    scriptSig: string
}
class Input {
    preOutPut: string
    amount: number
    fromAddress: string
    scriptSig: string
    constructor(arg: InputType){
        this.preOutPut = arg.preOutPut
        this.amount = arg.amount
        this.fromAddress = arg.fromAddress
        this.scriptSig = arg.scriptSig
    }
}