"use strict";
var Block = /** @class */ (function () {
    function Block(date, preHash, nonce) {
        this.hash = '';
        this.transactions = [];
        this.date = date;
        this.preHash = preHash;
        this.nonce = nonce;
    }
    return Block;
}());
