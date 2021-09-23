import { KeyPairSyncResult } from "crypto";
import { Transaction } from "../../../models/Transaction";
import { TransactionReward } from "../../../models/TransactionReward";
import unspentTransactions from "../../../models/UnspentTransactions";
import Wallet, { getHash } from "../../../models/Wallet";


export class TransactionTest implements TestCase {
    mock(transactionrewards: TransactionReward): void {
        jest.spyOn(unspentTransactions, 'getTransactions').mockImplementation(() => [transactionrewards]);
    }
    init(transaction: Transaction, keysPair: KeyPairSyncResult<string, string>): Transaction {
        transaction.inputs[0].scriptSig = Wallet.sign(getHash(JSON.stringify([transaction.inputs[0],transaction.outputs[0]])),keysPair);
        return transaction;
    }
    assert(transaction: Transaction): void {
        expect(Transaction.validTransaction(transaction)).toBe(true);
    }
}