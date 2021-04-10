import crypto from "crypto"
import { createHash } from "crypto";
import { blockChain } from "./BlockChain";
const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
}

console.log();
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
          this.address.push(createHash('sha256').update(this.KeysPair[i].publicKey).digest("hex"))
        }
    }
    getPublicKey(){
      return this.KeysPair[getRandomInt(this.numKeysPair)].publicKey
    }
    sign(document: string, publicKey: string) {
      const pair = this.KeysPair.filter(pairKey => getHash(pairKey.publicKey) == getHash(publicKey))[0]
      if(pair.privateKey === undefined) return false
      const signer = crypto.createSign('RSA-SHA256');
      signer.write(document)
      signer.end()
      return signer.sign({ 'key': pair.privateKey, 'passphrase': this.passphrase }, 'base64')
    }
    getMoney(){
      const myReward = blockChain.getAllBlock().filter(elem => this.address.includes(elem.miner))
      console.log('money : ',myReward.reduce( ( sum, { reward } ) => sum + reward , 0)+' |≠|')
    }
}

export default new Wallet()