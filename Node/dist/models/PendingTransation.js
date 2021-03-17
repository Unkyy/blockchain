"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PendingTransation = /** @class */ (function () {
    function PendingTransation() {
        this.transaction = [];
    }
    PendingTransation.prototype.verifTransaction = function (transaction) {
        return true;
    };
    PendingTransation.prototype.alreadySend = function (transaction) {
        if (this.transaction.length === 0) {
            return false;
        }
        return this.transaction.map(function (elem) { return JSON.stringify(elem); }).includes(JSON.stringify(transaction));
    };
    PendingTransation.prototype.getTransaction = function () {
        return this.transaction;
    };
    PendingTransation.prototype.setTransation = function (transaction) {
        var require = ["amount", "user", "password", "hash", "datetime"];
        //console.log('------',transaction.getKey)
        this.transaction.push(transaction);
        //console.log(this.transaction)
    };
    return PendingTransation;
}());
exports.default = new PendingTransation();
