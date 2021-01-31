"use strict";
var http = require('http');
var networkInterfaces = require('os').networkInterfaces;
var nets = networkInterfaces();
var results = Object.create(null); // Or just '{}', an empty object
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
var Serveur = /** @class */ (function () {
    function Serveur(port) {
        this.port = port;
    }
    Serveur.prototype.launch = function () {
        http.createServer(function (req, res) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            var body = [];
            req.on('data', function (chunk) { return body.push(chunk); })
                .on('end', function () {
                var data = JSON.parse(Buffer.concat(body).toString());
                console.log(data);
                console.log(data.origin);
                console.log(results);
                res.end();
            })
                .on('close', function () { });
        })
            .listen(this.port)
            .on('error', function (e) { return console.log("server error: " + e); });
    };
    return Serveur;
}());
var test = new Serveur(5000).launch();
