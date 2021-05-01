"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Input = /** @class */ (function () {
    function Input(arg) {
        this.outPut = arg.outPut;
        this.amount = arg.amount;
        this.fromAddress = arg.fromAddress;
        this.preHashTransaction = arg.preHashTransaction;
        this.scriptSig = arg.scriptSig;
    }
    return Input;
}());
exports.Input = Input;
