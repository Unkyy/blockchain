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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
var crypto_2 = require("crypto");
var BlockChain_1 = require("./BlockChain");
var Input_1 = require("./Input");
var Output_1 = require("./Output");
var Transaction_1 = require("./Transaction");
var getRandomInt = function (max) {
    return Math.floor(Math.random() * max);
};
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
            this.address.push(crypto_2.createHash('sha256')
                .update(this.KeysPair[i].publicKey)
                .digest("hex"));
        }
    }
    Wallet.prototype.getKeysPair = function (address) {
        return this.KeysPair.find(function (keyspair) { return getHash(keyspair.publicKey) === address; });
    };
    Wallet.prototype.getRandPublicKey = function () {
        return this.KeysPair[getRandomInt(this.numKeysPair)].publicKey;
    };
    Wallet.prototype.sign = function (document, address) {
        var pair = this.getKeysPair(address);
        if (pair === undefined)
            return [];
        var signer = crypto_1.default.createSign('RSA-SHA256');
        signer.write(document);
        signer.end();
        return [
            signer.sign({ 'key': pair.privateKey, 'passphrase': this.passphrase }, 'base64'),
            pair.publicKey
        ];
    };
    Wallet.prototype.getMoney = function () {
        var _this = this;
        var myReward = BlockChain_1.blockChain.getAllBlock().filter(function (elem) { return _this.address.includes(elem.miner); });
        console.log('money : ', myReward.reduce(function (sum, _a) {
            var reward = _a.reward;
            return sum + reward;
        }, 0) + ' |≠|');
    };
    // generateInputOutput(transactionRequest: TransactionRequest ){
    // }
    Wallet.prototype.CreateTransaction = function (transactionRequest) {
        var blocks = BlockChain_1.blockChain.getAllBlock();
        var inputs = [];
        var outputs = [];
        var rest;
        var transactionRequestRest = transactionRequest.amount;
        for (var i = 0; i < blocks.length; i++) {
            rest = blocks[i].reward - transactionRequestRest;
            var amount = rest < 0 ? transactionRequestRest + rest : transactionRequestRest;
            var input = {
                preOutPut: blocks[i].hash,
                amount: amount,
                fromAddress: blocks[i].miner,
            };
            var _a = this.sign(JSON.stringify(input), blocks[i].miner), scriptSig = _a[0], publicKey = _a[1];
            if (scriptSig !== undefined && publicKey !== undefined) {
                var output = {
                    inputAddress: getHash(JSON.stringify(input)),
                    amount: amount,
                    toAddress: transactionRequest.toAddress,
                    publicKey: publicKey
                };
                var outPutAddress = getHash(JSON.stringify(output));
                var test = new Input_1.Input(__assign({}, input, { scriptSig: scriptSig }));
                inputs.push(new Input_1.Input(__assign({}, input, { scriptSig: scriptSig })));
                outputs.push(new Output_1.Output(__assign({}, output, { outPutAddress: outPutAddress })));
                if (rest > 0) {
                    var output_1 = {
                        inputAddress: getHash(JSON.stringify(input)),
                        amount: rest,
                        toAddress: blocks[i].miner,
                        publicKey: publicKey
                    };
                    var outPutAddress_1 = getHash(JSON.stringify(output_1));
                    outputs.push(new Output_1.Output(__assign({}, output_1, { outPutAddress: outPutAddress_1 })));
                    break;
                }
                if (rest === 0) {
                    break;
                }
                transactionRequestRest = Math.abs(rest);
            }
        }
        var transaction = {
            inputs: inputs,
            outputs: outputs
        };
        return new Transaction_1.Transaction(transaction);
    };
    return Wallet;
}());
exports.default = new Wallet();
