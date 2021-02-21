"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require('http');
var Serveur = /** @class */ (function () {
    function Serveur(port) {
        this.port = port;
    }
    Serveur.prototype.launch = function () {
        var _this = this;
        return new Promise(function (res) {
            http.createServer(function (req, res) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                var body = [];
                req.on('data', function (chunk) { return body.push(chunk); })
                    .on('end', function () {
                    var data = JSON.parse(Buffer.concat(body).toString());
                    console.log(data);
                    res.end();
                })
                    .on('close', function () { });
            })
                .listen(_this.port, function () { return res(console.log("running on  port : " + _this.port)); })
                .on('error', function (e) { return console.log("server error: " + e); });
        });
    };
    return Serveur;
}());
exports.Serveur = Serveur;
