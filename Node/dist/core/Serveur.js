"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http = __importStar(require("http"));
var events_1 = require("events");
var blockchain_1 = require("../controller/blockchain");
var transaction_1 = require("../controller/transaction");
var Serveur = /** @class */ (function () {
    //blockchain: BlockChain = new BlockChain()
    function Serveur(port, client) {
        this.minning = false;
        this.port = port;
        console.log('constructor', client);
        this.client = client;
    }
    Serveur.prototype.App = function () {
        var _this = this;
        var emitter = new events_1.EventEmitter();
        http.createServer(function (req, res) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            req.on('error', function (err) {
                console.log('server error:', err);
            });
            if (req.method === "OPTIONS") {
                res.setHeader('Acces-Control-Allow-Headers', 'Accept, Content-Type');
            }
            if (req.url === "/blockchain") {
                emitter.emit('blockchain', req, res, _this.client);
            }
            if (req.url === "/transaction") {
                emitter.emit('transaction', req, res, _this.client);
            }
            console.log(req.url);
        })
            .listen(this.port, function () { return console.log("running on  port : " + _this.port); });
        return emitter;
    };
    Serveur.prototype.launch = function () {
        var app = this.App();
        app.on('blockchain', blockchain_1.blockChainController);
        app.on('transaction', transaction_1.transactionController);
    };
    return Serveur;
}());
exports.Serveur = Serveur;
