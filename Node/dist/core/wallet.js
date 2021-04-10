"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
var Wallet = /** @class */ (function () {
    function Wallet() {
        {
            this.publicKey, this.privateKey = crypto_1.default.generateKeyPairSync("rsa", {
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
                    passphrase: 'top secret'
                }
            });
            sign = signer.sign({ 'key': privateKey, 'passphrase': 'top secret deeeded' }, 'base64');
        }
    }
    return Wallet;
}());
