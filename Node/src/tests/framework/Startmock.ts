import { TransactionReward } from "../../models/TransactionReward";

(() => {
    jest.mock("../models/TransactionReward", () => {
        return {
          TransactionReward: jest.fn().mockImplementation(() => {
            const output = {
              amount: 12,
              toAddress: "this.block.miner",
              publicKey:"publicKkokey"
              }
            new TransactionReward(output)
            return {
              success: true,
            };
          }),
        };
      });
})