import { OutputType } from "../../../models/Output";
import wallet, { getHash } from "../../../models/Wallet";
import { Transaction } from "../../../models/Transaction";


export class TransactionData{
    publicKey = wallet.getRandPublicKey();
    output: OutputType = {
        amount: 12,
        toAddress: getHash(this.publicKey),
        publicKey: this.publicKey
    };
    transactionrewards = new Transaction([],[this.output]);
    keysPair = wallet.getKeysPairWithAddress(getHash(this.publicKey));
    transaction = new Transaction(
        [{"address":getHash(this.publicKey),"amount":12,"indexOutput":0,"txHash":this.transactionrewards.hash}],
        [{ amount: 12,toAddress: "drfrfrfr",publicKey: this.publicKey},{ amount: 4,toAddress: "this.block.miner",publicKey: this.publicKey}]
        );
}
