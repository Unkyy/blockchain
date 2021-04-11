"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Transaction = /** @class */ (function () {
    function Transaction(arg) {
        this.outputs = arg.outputs;
        this.inputs = arg.inputs;
        this.datetime = new Date();
        // console.log(this)
        // console.log(this.test())
    }
    return Transaction;
}());
exports.Transaction = Transaction;
