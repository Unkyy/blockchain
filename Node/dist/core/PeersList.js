"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PeerList = /** @class */ (function () {
    function PeerList(peers) {
        this.peers = [];
        this.peers = peers;
    }
    PeerList.prototype.getPeers = function () {
        return JSON.parse(this.peers);
    };
    return PeerList;
}());
exports.PeerList = PeerList;
