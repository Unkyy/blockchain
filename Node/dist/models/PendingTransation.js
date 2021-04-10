"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PendingTransation = /** @class */ (function () {
    function PendingTransation() {
        this.transactions = [];
    }
    PendingTransation.prototype.validTransaction = function (transaction) {
        return true;
    };
    PendingTransation.prototype.addTransaction = function (transaction) {
        if (this.transactions.some(function (elem) { return elem.hash === transaction.hash; })) {
            return false;
        }
        if (this.validTransaction(transaction)) {
            this.pushTransation(transaction);
            return true;
        }
        return false;
    };
    PendingTransation.prototype.getTransactionPool = function () {
        return this.transactions;
    };
    PendingTransation.prototype.pushTransation = function (transaction) {
        var require = ["amount", "user", "password", "hash", "datetime"];
        //console.log('------',transaction.getKey)
        this.transactions.push(transaction);
    };
    return PendingTransation;
}());
exports.default = new PendingTransation();
