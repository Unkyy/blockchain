"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
exports.Serveur = void 0;
var http = __importStar(require("http"));
var BlockChain_1 = require("../models/BlockChain");
var Mining_1 = require("../models/Mining");
var events_1 = require("events");
var blockchain_1 = require("../controller/blockchain");
var transaction_1 = require("../controller/transaction");
var Serveur = /** @class */ (function () {
    //blockchain: BlockChain = new BlockChain()
    function Serveur(port, client) {
        this.mining = false;
        this.port = port;
        //console.log('constructor',client)
        this.client = client;
        this.handlemining();
    }
    Serveur.prototype.App = function () {
        var _this = this;
        var emitter = new events_1.EventEmitter();
        http.createServer(function (req, res) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            req.on('error', function (err) {
                console.log('server error:', err);
            });
            var url = req.url ? req.url : "";
            emitter.emit(url, req, res, _this.client);
            // if(url ===""){
            //     res.statusCode = 404;
            //     res.end("404 Not Found");
            // }else if(req.method === "OPTIONS"){
            //     res.setHeader('Acces-Control-Allow-Headers', 'Accept, Content-Type')
            // }
            // else if(url === "/transaction/create"){
            //     emitter.emit('/transaction/create',req, res,this.client)
            // }
            // else if(url === "/transaction/transfer"){
            //     emitter.emit('transaction/transfer',req, res,this.client)
            // }
            // else if(url === "/blockchain/get"){
            //     emitter.emit('/blockchain/get',req, res,this.client)
            // }else if(url === "/blockchain"){
            //     emitter.emit('/blockchain',req, res,this.client)
            // }else {
            //     res.statusCode = 404;
            //     res.end("404 Not Found");
            // }
        })
            .listen(this.port, function () { return console.log("running on  port : " + _this.port); });
        return emitter;
    };
    Serveur.prototype.launch = function () {
        var app = this.App();
        app.on('/blockchain', blockchain_1.blockChainController);
        app.on('/blockchain/get', blockchain_1.getBlockChainController);
        app.on('/transaction/create', transaction_1.transactionCreateController);
        app.on('/transaction/transfer', transaction_1.transactionTransferController);
    };
    Serveur.prototype.handlemining = function () {
        return __awaiter(this, void 0, void 0, function () {
            var block;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!true) return [3 /*break*/, 2];
                        return [4 /*yield*/, new Mining_1.Mining().findHash()];
                    case 1:
                        block = _a.sent();
                        BlockChain_1.blockChain.addBlock(block);
                        //console.log(block)
                        this.client.sendAllPeer(block, '/blockchain');
                        return [3 /*break*/, 0];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    return Serveur;
}());
exports.Serveur = Serveur;
