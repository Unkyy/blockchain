"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Serveur_1 = require("./core/Serveur");
var SendIPv4_1 = require("./core/SendIPv4");
var Client_1 = require("./core/Client");
var tetetee = new SendIPv4_1.SendIPv4();
var peers = tetetee.send();
var test = new Serveur_1.Serveur(5000).launch();
var client = new Client_1.Client(peers).connectPeer();
