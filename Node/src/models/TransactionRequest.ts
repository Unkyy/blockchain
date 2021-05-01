import { Input } from "./Input";
import { Output } from "./Output";
import { Transaction } from "./Transaction";
import transationPool from "./TransationPool";
import wallet, { getHash } from "./Wallet";

export type TransactionRequestType = {
    amount: number;
    toAddress: string;
}

export class TransactionRequest extends Transaction {
    constructor (transactionRequest: TransactionRequestType){
        const transactionPool = transationPool.getTransactionPool()
        let inputs:Array<Input> = [];
        let outputs:Array<Output> = [];
        let rest;
        let transactionRequestRest = transactionRequest.amount;
        for(let i = 0; i < transactionPool.length; i++){
          rest = transactionPool[i].outputs[0].amount - transactionRequestRest
          const amount = rest < 0 ? transactionRequestRest + rest : transactionRequestRest
          const output = transactionPool[i].outputs.find( elem => wallet.getKeysPair(elem.toAddress) !== undefined)
          if(!output) continue;
          const input = {
            preHashTransaction: transactionPool[i].hash,
            outPut: output.outPutAddress,
            amount: amount,
            fromAddress: transactionPool[i].outputs[0].outPutAddress,
          } 
          const [scriptSig, publicKey] = wallet.sign(JSON.stringify(input), output.toAddress)
          if(scriptSig !== undefined && publicKey !== undefined){
            const output = {
              inputAddress: getHash(JSON.stringify(input)),
              amount: amount,
              toAddress: transactionRequest.toAddress,
              publicKey: publicKey
            }
  
            const outPutAddress = getHash(JSON.stringify(output));
            const test = new Input({...input, scriptSig})
            inputs.push(new Input({...input, scriptSig}))
            outputs.push(new Output({...output, outPutAddress: outPutAddress}))
            if(rest > 0){
              const output = {
                inputAddress: getHash(JSON.stringify(input)),
                amount: rest,
                toAddress: transactionPool[i].outputs[0].toAddress,
                publicKey: publicKey
              }
              const outPutAddress = getHash(JSON.stringify(output));
              outputs.push(new Output({...output, outPutAddress: outPutAddress}))
              break
            }
            if(rest === 0){
              break
            }
            transactionRequestRest = Math.abs(rest)
          }
        }
        super(inputs,outputs)
    }
    
}