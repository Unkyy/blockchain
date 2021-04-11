"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Output = /** @class */ (function () {
    function Output(arg) {
        this.outPutAddress = arg.outPutAddress;
        this.amount = arg.amount;
        this.toAddress = arg.toAddress;
        this.publicKey = arg.publicKey;
        this.inputAddress = arg.inputAddress;
    }
    return Output;
}());
exports.Output = Output;
