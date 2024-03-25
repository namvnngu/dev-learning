"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const EntityRouter_1 = __importDefault(require("./EntityRouter"));
class APIServer {
    constructor() {
        this._app = (0, express_1.default)();
        this._app.set("port", process.env.PORT || 3000);
        this.configureMiddleware();
    }
    configureMiddleware() {
        // Set up body parsing - required for POST requests
        this._app.use(body_parser_1.default.json());
        this._app.use(body_parser_1.default.urlencoded({ extended: true }));
        // Set up CORS
        this._app.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
            res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Credentials,Access-Control-Allow-Methods");
            next();
        });
    }
    start() {
        this._server = this._app.listen(this._app.get("port"), () => {
            console.log("Server is running on port " + this._app.get("port"));
        });
    }
    addEntity(clazz) {
        const name = Reflect.getMetadata("entity:name", clazz);
        let entityRouter = new EntityRouter_1.default(name, clazz);
        this._app.use(`/${name}`, entityRouter.router);
    }
    get app() {
        return this._app;
    }
    get server() {
        return this._server;
    }
}
exports.default = APIServer;
//# sourceMappingURL=APIServer.js.map