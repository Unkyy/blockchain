"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
var Transaction = /** @class */ (function () {
    function Transaction(arg) {
        this.amount = arg.amount;
        this.user = arg.user;
        this.outputs = arg.outputs;
        this.inputs = arg.inputs;
        this.hash = arg.hash;
        this.datetime = arg.datetime;
        console.log(this);
        console.log(this.test());
    }
    Transaction.prototype.test = function () {
        return this.amount + this.amount;
    };
    return Transaction;
}());
exports.Transaction = Transaction;
