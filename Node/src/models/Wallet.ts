import crypto from "crypto"
import { createHash, Signer } from "crypto";
import { blockChain } from "./BlockChain";
import { Input } from "./Input";
import { Output } from "./Output";
import { InputOutputType, Transaction, TransactionRequest } from "./Transaction";
const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
}

const getHash = (elem: string) => createHash('sha256').update(elem).digest("hex");
class Wallet {
    KeysPair: Array<crypto.KeyPairSyncResult<string, string>>
    numKeysPair: number
    passphrase: string
    address: Array<string>
    constructor(numKeysPair = 10,passphrase: string = "top secret"){
        this.numKeysPair = numKeysPair;
        this.KeysPair = [];
        this.address = [];
        this.passphrase = passphrase 
        for(let i = 0; i < numKeysPair; i++){
          this.KeysPair.push(crypto.generateKeyPairSync("rsa", {
            // The standard secure default length for RSA keys is 2048 bits
            modulusLength: 4096,
            publicKeyEncoding: {
              type: 'spki',
              format: 'pem'
            },
            privateKeyEncoding: {
              type: 'pkcs8',
              format: 'pem',
              cipher: 'aes-256-cbc',
              passphrase: this.passphrase 
            }
          }));
          this.address.push(createHash('sha256')
            .update(this.KeysPair[i].publicKey)
            .digest("hex"))
        }
    }
    getKeysPair(address: string): crypto.KeyPairSyncResult<string, string>| undefined{
        return this.KeysPair.find(keyspair => getHash(keyspair.publicKey) === address)
    }
    getRandPublicKey() {
      return this.KeysPair[getRandomInt(this.numKeysPair)].publicKey
    }
    sign(document: string, address: string): [string,string] | [] {
      const pair = this.getKeysPair(address)
      if(pair === undefined) return []
      const signer = crypto.createSign('RSA-SHA256');
      signer.write(document)
      signer.end()
      return  [
        signer.sign({ 'key': pair.privateKey, 'passphrase': this.passphrase }, 'base64'),
        pair.publicKey
      ]
    }
    getMoney(){
      const myReward = blockChain.getAllBlock().filter(elem => this.address.includes(elem.miner))
      console.log('money : ',myReward.reduce( ( sum, { reward } ) => sum + reward , 0)+' |≠|')
    }
    // generateInputOutput(transactionRequest: TransactionRequest ){
    // }
    CreateTransaction(transactionRequest: TransactionRequest ){
      const blocks = blockChain.getAllBlock()
      let inputs:Array<Input> = [];
      let outputs:Array<Output> = [];
      let rest;
      let transactionRequestRest = transactionRequest.amount;
      for(let i = 0; i < blocks.length; i++){
        rest = blocks[i].reward - transactionRequestRest
        const amount = rest < 0 ? transactionRequestRest + rest : transactionRequestRest
        const input = {
          preOutPut: blocks[i].hash,
          amount: amount,
          fromAddress: blocks[i].miner,
        } 
        const [scriptSig, publicKey] = this.sign(JSON.stringify(input), blocks[i].miner)
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
              toAddress: blocks[i].miner,
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
      const transaction: InputOutputType = {
        inputs: inputs,
        outputs:outputs
      }
      return new Transaction(transaction)
    }
}

export default new Wallet()