"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Block_1 = require("./Block");
var crypto_1 = require("crypto");
var Minning_1 = require("./Minning");
var BlockChain = /** @class */ (function () {
    function BlockChain() {
        this.blocks = [];
    }
    BlockChain.prototype.mergreBlock = function (block) {
        var blocks = exports.blockChain.getAllBlock();
        //if(!blocks) return false;
        //if(blocks.length <= this.blocks.length) return false
        //this.blocks = blocks
        console.log(this.addBlock(block));
        return false;
        // return true
    };
    BlockChain.prototype.findMatchIndex = function () {
    };
    BlockChain.prototype.blocksVerify = function (blockChain) {
        var blocks = blockChain.getAllBlock();
        for (var i = blocks.length - 1; i >= 0; i--) {
            var element = blocks[i];
            var verifElement = __assign({}, element);
            verifElement.hash = '';
            var posthash = blocks[i - 1] ? blocks[i - 1].hash : "0";
            var hash = crypto_1.createHash('sha256').update(JSON.stringify(verifElement)).digest("hex");
            if (posthash == "0" && i > 0)
                return false;
            if (element.hash != hash)
                return false;
            if (posthash !== element.preHash)
                return false;
            if (!Minning_1.Minning.validHash(hash))
                return false;
        }
        return true;
    };
    BlockChain.prototype.validblock = function (block) {
    };
    BlockChain.prototype.addBlock = function (block) {
        var element = block;
        var verifElement = __assign({}, block);
        verifElement.hash = '';
        var posthash = this.blocks[this.blocks.length - 1] ? this.blocks[this.blocks.length - 1].hash : "0";
        console.log(posthash);
        var hash = crypto_1.createHash('sha256').update(JSON.stringify(verifElement)).digest("hex");
        if (block.preHash == "0" && this.blocks.length > 0)
            return false;
        if (element.hash != hash)
            return false;
        if (posthash !== element.preHash)
            return false;
        if (!Minning_1.Minning.validHash(hash))
            return false;
        this.blocks.push(block);
        console.log(this.blocks);
        return true;
    };
    BlockChain.prototype.getLastBlock = function () {
        var block = this.blocks[this.blocks.length - 1];
        return block ? block : new Block_1.Block(new Date, "0");
    };
    BlockChain.prototype.getAllBlock = function () {
        return this.blocks;
    };
    BlockChain.prototype.length = function () {
        return this.blocks.length;
    };
    return BlockChain;
}());
exports.BlockChain = BlockChain;
exports.blockChain = new BlockChain();
