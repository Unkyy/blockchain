"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require('http').request;
var qs = require("querystring");
var data = JSON.stringify({
    todo: 'Buy the milk',
});
var defaultoption = {
    "method": "POST",
    "hostname": "nodeserver",
    "port": "9001",
    "path": "/",
    "headers": {
        "content-type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
    }
};
var NodeServerConnection = /** @class */ (function () {
    function NodeServerConnection(options) {
        if (options === void 0) { options = defaultoption; }
        var _this = this;
        var test = function () {
            console.log('szszszs');
            _this.req = request(options, function (res) {
                var chunks = [];
                res.on("data", function (chunk) {
                    chunks.push(chunk);
                });
                res.on("error", function () {
                    console.log("errrrrrrrrrr");
                    test();
                });
                res.on("end", function () {
                    var body = Buffer.concat(chunks);
                    console.log(body.toString());
                });
            });
        };
        test();
    }
    NodeServerConnection.prototype.send = function (data) {
        console.log("call");
        this.req.write(qs.stringify(data));
        this.req.end();
    };
    return NodeServerConnection;
}());
exports.NodeServerConnection = NodeServerConnection;
