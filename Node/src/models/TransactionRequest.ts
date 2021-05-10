import { OutputType } from "./Output";
import { Transaction } from "./Transaction";
import unspentTransactions from "./UnspentTransactions";
import wallet, { getHash } from "./Wallet";
const util = require('util')

export type TransactionRequestType = {
    amount: number;
    toAddress: string;
}

export class TransactionRequest extends Transaction {
    constructor (transactionRequest: TransactionRequestType){
        const UnspentTransacts = unspentTransactions.getTransactions()
        let inputs:Array<InputType> = [];
        let outputs:Array<OutputType> = [];
        let rest;
        let transactionRequestRest = transactionRequest.amount;
        for(let i = 0; i < UnspentTransacts.length; i++){
          const preOutputIndex = UnspentTransacts[i].outputs.findIndex(elem => wallet.getKeysPairWithAddress(elem.toAddress) !== undefined)
          const preOutput = UnspentTransacts[i].outputs[preOutputIndex]
          if(preOutput === undefined || preOutput.toAddress === undefined) continue;
          rest = UnspentTransacts[i].outputs[0].amount - transactionRequestRest
          const amount = rest < 0 ? transactionRequestRest + rest : transactionRequestRest
          let input: InputType = {
            txHash: UnspentTransacts[i].hash,
            IndexOutput: preOutputIndex,
            address: preOutput.toAddress,
            amount: amount,
          } 
          const keysPair = wallet.getKeysPairWithAddress(preOutput.toAddress)
          if(keysPair !== undefined){
            let output: OutputType = {
              amount: amount,
              toAddress: transactionRequest.toAddress,
              publicKey: keysPair.publicKey
            }
            outputs.push(output)
            input.scriptSig = wallet.sign(getHash(JSON.stringify([input,output])),keysPair)
            inputs.push(input)
            if(rest > 0){
              const output: OutputType  = {
                amount: rest, 
                toAddress: preOutput.toAddress,
                publicKey: keysPair.publicKey
              }
              outputs.push(output)
              break
            }
            if(rest === 0){
              break
            }
            transactionRequestRest = Math.abs(rest)
          }
        }
        super(inputs,outputs)
        console.log(this)
    }
    
}