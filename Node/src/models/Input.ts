type InputType = {
    txHash: string
    IndexOutput: number
    address: string
    amount: number
    scriptSig?: string
}
// export class Input {
//     outPut: string
//     amount: number
//     fromAddress: string
//     scriptSig?: string
//     preHashTransaction: string
//     constructor(arg: InputType){
//         this.outPut = arg.outPut
//         this.amount = arg.amount
//         this.fromAddress = arg.fromAddress
//         this.preHashTransaction = arg.preHashTransaction
//         this.scriptSig = arg.scriptSig
//     }
// }