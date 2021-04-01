"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = require("crypto");
var Block_1 = require("./Block");
var BlockChain_1 = require("./BlockChain");
var timer = function (ms) { return new Promise(function (res) { return setTimeout(res, ms); }); };
var howManyZero = function (howManyZero) {
    if (howManyZero === void 0) { howManyZero = 3; }
    var zero = [];
    for (var i = 0; i < howManyZero; i++) {
        zero.push("0");
    }
    return zero.join('');
};
var Minning = /** @class */ (function () {
    function Minning() {
        this.block = new Block_1.Block(new Date, "0");
    }
    Minning.prototype.findHash = function () {
        return __awaiter(this, void 0, void 0, function () {
            var hash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.block.preHash = BlockChain_1.blockChain.getLastBlock().hash ? BlockChain_1.blockChain.getLastBlock().hash : "0";
                        hash = crypto_1.createHash('sha256').update(JSON.stringify(this.block)).digest("hex");
                        _a.label = 1;
                    case 1:
                        if (!!Minning.validHash(hash)) return [3 /*break*/, 3];
                        this.block.incrementNonce();
                        hash = crypto_1.createHash('sha256').update(JSON.stringify(this.block)).digest("hex");
                        return [4 /*yield*/, timer(10)
                            //console.log(this.block)
                            //console.log(hash)
                        ];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3:
                        this.block.hash = hash;
                        return [2 /*return*/, this.block];
                }
            });
        });
    };
    Minning.validHash = function (hash) {
        return hash.substring(0, Minning.zero.length)
            .includes(Minning.zero);
    };
    Minning.zero = howManyZero();
    return Minning;
}());
exports.Minning = Minning;