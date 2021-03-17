"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BlockChain = /** @class */ (function () {
    function BlockChain() {
        this.blocks = [];
    }
    BlockChain.prototype.mergreBlock = function (blockvhain) {
    };
    BlockChain.prototype.blocksVerify = function () {
    };
    BlockChain.prototype.getLastBlock = function () {
        return this.blocks[this.blocks.length - 1];
    };
    BlockChain.prototype.getAllBlock = function () {
        return this.blocks;
    };
    return BlockChain;
}());
exports.BlockChain = BlockChain;
exports.blockChain = new BlockChain();
