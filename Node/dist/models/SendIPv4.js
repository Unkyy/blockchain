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
    }
    SendIPv4.prototype.send = function () {
        var test = __assign({}, this.ipv4);
        var data = {
            IP: test.eth0[0].address
        };
        this.nodeServeur.send(data);
    };
    return SendIPv4;
}());
exports.SendIPv4 = SendIPv4;
