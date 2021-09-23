import { Console } from "console";
import { OutputType } from "../models/Output";
import { Transaction } from "../models/Transaction";
import { TransactionReward } from "../models/TransactionReward";
import unspentTransactions from "../models/UnspentTransactions";
import wallet, { getHash } from "../models/Wallet";

jest.mock("../models/TransactionReward", () => {
    return {
      TransactionReward: jest.fn().mockImplementation(() => {
        const output = {
          amount: 12,
          toAddress: "this.block.miner",
          publicKey:"publicKkokey"
          }
        new TransactionReward(output)
      }),
    };
  });

const publicKey = wallet.getRandPublicKey()

const output: OutputType = {
          amount: 15,
          toAddress: getHash(publicKey),
          publicKey: publicKey
          } 
const transactionrewards = new Transaction([],[output])

const transaction = new Transaction(
  [{"address":getHash(publicKey),"amount":12,"indexOutput":0,"txHash":transactionrewards.hash}],
  [{ amount: 12,toAddress: "drfrfrfr",publicKey: publicKey},{ amount: 4,toAddress: "this.block.miner",publicKey: publicKey}])
const keysPair = wallet.getKeysPairWithAddress(getHash(publicKey))
if(keysPair !== undefined){
    transaction.inputs[0].scriptSig = wallet.sign(getHash(JSON.stringify([transaction.inputs[0],transaction.outputs[0]])),keysPair)
  }
// jest.spyOn(unspentTransactions, 'getTransactions').mockImplementation(() => [transactionrewards,transaction]);
unspentTransactions.addTransactions([transactionrewards])
unspentTransactions.addTransactions([transaction])
unspentTransactions.transactionSpend(transaction)

// unspentTransactions.transactionSpend(transaction)

test('the transaction is already spend',() => {
    expect(unspentTransactions.addTransactions([transaction])).toBe(false)
})