"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.apiServer = void 0;
const node_json_db_1 = require("node-json-db");
const JsonDBConfig_1 = require("node-json-db/dist/lib/JsonDBConfig");
const APIServer_1 = __importDefault(require("./APIServer"));
const Person_1 = __importDefault(require("./entities/Person"));
exports.apiServer = new APIServer_1.default();
exports.db = new node_json_db_1.JsonDB(new JsonDBConfig_1.Config("entityDatabase", true, true, '/'));
exports.apiServer.addEntity(Person_1.default);
exports.apiServer.start();
//# sourceMappingURL=app.js.map