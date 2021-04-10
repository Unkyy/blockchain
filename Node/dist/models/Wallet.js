"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
var crypto_2 = require("crypto");
var BlockChain_1 = require("./BlockChain");
var getRandomInt = function (max) {
    return Math.floor(Math.random() * max);
};
console.log();
var getHash = function (elem) { return crypto_2.createHash('sha256').update(elem).digest("hex"); };
var Wallet = /** @class */ (function () {
    function Wallet(numKeysPair, passphrase) {
        if (numKeysPair === void 0) { numKeysPair = 10; }
        if (passphrase === void 0) { passphrase = "top secret"; }
        this.numKeysPair = numKeysPair;
        this.KeysPair = [];
        this.address = [];
        this.passphrase = passphrase;
        for (var i = 0; i < numKeysPair; i++) {
            this.KeysPair.push(crypto_1.default.generateKeyPairSync("rsa", {
                // The standard secure default length for RSA keys is 2048 bits
                modulusLength: 4096,
                publicKeyEncoding: {
                    type: 'spki',
                    format: 'pem'
                },
                privateKeyEncoding: {
                    type: 'pkcs8',
                    format: 'pem',
                    cipher: 'aes-256-cbc',
                    passphrase: this.passphrase
                }
            }));
            this.address.push(crypto_2.createHash('sha256').update(this.KeysPair[i].publicKey).digest("hex"));
        }
    }
    Wallet.prototype.getPublicKey = function () {
        return this.KeysPair[getRandomInt(this.numKeysPair)].publicKey;
    };
    Wallet.prototype.sign = function (document, publicKey) {
        var pair = this.KeysPair.filter(function (pairKey) { return getHash(pairKey.publicKey) == getHash(publicKey); })[0];
        if (pair.privateKey === undefined)
            return false;
        var signer = crypto_1.default.createSign('RSA-SHA256');
        signer.write(document);
        signer.end();
        return signer.sign({ 'key': pair.privateKey, 'passphrase': this.passphrase }, 'base64');
    };
    Wallet.prototype.getMoney = function () {
        var _this = this;
        var myReward = BlockChain_1.blockChain.getAllBlock().filter(function (elem) { return _this.address.includes(elem.miner); });
        console.log('money : ', myReward.reduce(function (sum, _a) {
            var reward = _a.reward;
            return sum + reward;
        }, 0) + ' |≠|');
    };
    return Wallet;
}());
exports.default = new Wallet();
