"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NodeServerConnection_1 = require("../connections/NodeServerConnection");
var networkInterfaces = require('os').networkInterfaces;
var nets = networkInterfaces();
var results = Object.create(null); // Or just '{}', an empty object
var SendIPv4 = /** @class */ (function () {
    function SendIPv4() {
        this.ipv4 = [];
        this.nodeServeur = new NodeServerConnection_1.NodeServerConnection();
        for (var _i = 0, _a = Object.keys(nets); _i < _a.length; _i++) {
            var name_1 = _a[_i];
            for (var _b = 0, _c = nets[name_1]; _b < _c.length; _b++) {
                var net = _c[_b];
                // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
                if (net.family === 'IPv4' && !net.internal) {
                    if (!results[name_1]) {
                        results[name_1] = [];
                    }
                    results[name_1].push(net);
                }
            }
        }
        this.ipv4 = results;
        console.log("dzdzdzdd");
    }
    SendIPv4.prototype.send = function () {
        console.log("cjiefciejfiejfeifjeifjefiejifje");
        this.nodeServeur.send({ todo: 'Buy the mdedededeilk' });
    };
    return SendIPv4;
}());
exports.SendIPv4 = SendIPv4;
