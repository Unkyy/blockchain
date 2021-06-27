"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
var Wallet_1 = require("./Wallet");
var util = require('util');
var Transaction = /** @class */ (function () {
    function Transaction(inputs, outputs, datetime, hash) {
        this.inputs = inputs;
        this.outputs = outputs;
        this.datetime = datetime ? datetime : new Date();
        this.hash = hash ? hash : Wallet_1.getHash(JSON.stringify(this));
        return this;
    }
    return Transaction;
}());
exports.Transaction = Transaction;
