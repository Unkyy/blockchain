
import { OutputType } from "../models/Output";
import { Transaction } from "../models/Transaction";
import { TransactionReward } from "../models/TransactionReward";
import UnspentTransactions from "../models/UnspentTransactions";
import unspentTransactions from "../models/UnspentTransactions";
import wallet, { getHash } from "../models/Wallet";




// const publicKey = wallet.getRandPublicKey()

// const output: OutputType = {
//           amount: 12,
//           toAddress: getHash(publicKey),
//           publicKey: publicKey
//           } 
// const transactionrewards = new Transaction([],[output])

// jest.spyOn(unspentTransactions, 'getTransactions').mockImplementation(() => [transactionrewards]);
// const transaction = new Transaction(
//   [{"address":getHash(publicKey),"amount":12,"indexOutput":0,"txHash":transactionrewards.hash}],
//   [{ amount: 12,toAddress: "drfrfrfr",publicKey: publicKey},{ amount: 4,toAddress: "this.block.miner",publicKey: publicKey}])
// const keysPair = wallet.getKeysPairWithAddress(getHash(publicKey))

// console.log('json : ', JSON.stringify([transaction.inputs[0],transaction.outputs[0]]))
// console.log('json : ', getHash(JSON.stringify([transaction.inputs[0],transaction.outputs[0]])))

// // if(transaction.outputs[0].publicKey !== undefined) {
// //   console.log(getHash(transaction.outputs[0].publicKey))
// // }

// if(keysPair !== undefined){
//   transaction.inputs[0].scriptSig = wallet.sign(getHash(JSON.stringify([transaction.inputs[0],transaction.outputs[0]])),keysPair)
// }

// // describe("test transaction.ts", () => {})
// test('transaction is valid', () => {
//     expect(Transaction.validTransaction(transaction)).toBe(true);
//   });
// jest.mock("../models/TransactionReward", () => {
//   return {
//     TransactionReward: jest.fn().mockImplementation(() => {
//       const output = {
//         amount: 12,
//         toAddress: "this.block.miner",
//         publicKey:"publicKkokey"
//         }
//       new TransactionReward(output)
//       return {
//         success: true,
//       };
//     }),
//   };
// });
// const test = new TestHandler()