"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
var Block = /** @class */ (function () {
    function Block(datetime, preHash) {
        this.hash = '';
        this.nonce = 0;
        this.transactions = [];
        this.miner = "";
        this.reward = 50;
        this.datetime = datetime;
        this.preHash = preHash;
    }
    Block.prototype.incrementNonce = function () {
        this.nonce++;
    };
    return Block;
}());
exports.Block = Block;
