"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Transaction = /** @class */ (function () {
    function Transaction(amount, user, password, hash, datetime) {
        this.amount = amount;
        this.user = user;
        this.password = password;
        this.hash = hash;
        this.datetime = datetime;
    }
    return Transaction;
}());
exports.Transaction = Transaction;
