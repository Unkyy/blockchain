"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Wallet_1 = require("./Wallet");
var util = require('util');
var Transaction = /** @class */ (function () {
    function Transaction(inputs, outputs) {
        this.inputs = inputs;
        this.outputs = outputs;
        this.datetime = new Date();
        this.hash = Wallet_1.getHash(JSON.stringify(this));
        return this;
    }
    return Transaction;
}());
exports.Transaction = Transaction;
