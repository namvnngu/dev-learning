import * as http from "http";
import express, { Express, Response, Request } from "express";
import bodyParser from "body-parser";
import BaseEntity, { EntityTypeInstance } from "./entities/BaseEntity";
import EntityRouter from "./EntityRouter";

export default class APIServer {
  private _app: Express;
  private _server: http.Server;

  constructor() {
    this._app = express();
    this._app.set("port", process.env.PORT || 3000);
    this.configureMiddleware();
  }

  public configureMiddleware() {
    // Set up body parsing - required for POST requests
    this._app.use(bodyParser.json());
    this._app.use(bodyParser.urlencoded({ extended: true }));

    // Set up CORS
    this._app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Origin,Access-Control-Allow-Credentials,Access-Control-Allow-Methods"
      );
      next();
    });
  }

  public start() {
    this._server = this._app.listen(this._app.get("port"), () => {
      console.log("Server is running on port " + this._app.get("port"));
    });
  }

  public addEntity<T extends BaseEntity>(clazz: EntityTypeInstance<T>) {
    const name = Reflect.getMetadata("entity:name", clazz);
    let entityRouter = new EntityRouter<T>(name, clazz);
    this._app.use(`/${name}`, entityRouter.router);
  }

  get app(): Express {
    return this._app;
  }

  get server(): http.Server {
    return this._server;
  }
}
