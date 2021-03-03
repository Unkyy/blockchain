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
var Serveur = /** @class */ (function () {
    function Serveur(port) {
        this.port = port;
    }
    Serveur.prototype.launch = function (client) {
        var _this = this;
        //launch(): Promise<void>{
        return new Promise(function (res) {
            http.createServer(function (req, res) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                var body = [];
                req.on('data', function (chunk) {
                    console.log('server', chunk.toString());
                });
                //res.write(JSON.stringify({"test": 10}))
                res.end(JSON.stringify({ "test": 10 }));
            })
                .listen(_this.port, function () { return res(console.log("running on  port : " + _this.port)); });
        });
    };
    return Serveur;
}());
exports.Serveur = Serveur;
