import { db } from "./app";
import * as uuid from "uuid";
import express, { Router, Request, Response } from "express";
import BaseEntity, {
  EntityTypeInstance,
  EntityFactory,
} from "./entities/BaseEntity";
import { auth, logRoute, validate } from './decorators'

export default class EntityRouter<T extends BaseEntity> {
  private _router: Router;

  get router(): Router {
    return this._router;
  }

  constructor(public name: string, private classRef: EntityTypeInstance<T>) {
    this._router = express.Router();
    this.addEntityRoutes();
  }

  addEntityRoutes() {
    // CREATE
    this._router.post("/", (req, res) => {
      this.createEntity(req, res);
    });

    // READ all
    this._router.get("/", (req, res) => {
      this.fetchAllEntities(req, res);
    });

    // READ one
    this._router.get("/:id", (req, res) => {
      this.fetchEntity(req, res);
    });

    // UPDATE
    this._router.put("/:id", (req, res) => {
      this.updateEntity(req, res);
    });

    // DELETE
    this._router.delete("/:id", (req, res) => {
      this.deleteEntity(req, res);
    });
  }

  @auth("reader")
  @logRoute
  private fetchAllEntities(req: Request, res: Response) {
    let data = {};
    data = db.getData(`/${this.name}`);
    res.json(data);
  }

  @auth("reader")
  @logRoute
  private fetchEntity(req: Request, res: Response) {
    let data = {};
    data = db.getData(`/${this.name}/${req.params.id}`);
    res.json(data);
  }

  @auth("writer")
  @logRoute
  private createEntity(req: Request, res: Response) {
    let newEntity = EntityFactory.fromPersistenceObject<T>(req.body, this.classRef);
    let errorMap = validate(newEntity);
    if (Object.keys(errorMap).length > 0) {
      const output = { errors: errorMap };
      res.status(400).json(output);
      return;
    }
    const idProperty = Reflect.getMetadata("entity:id", newEntity);
    newEntity[idProperty] = uuid.v4();
    db.push(`/${this.name}/${newEntity[idProperty]}`, newEntity.getPersistenceObject());
    res.status(200).json(newEntity)
  }

  @auth("writer")
  @logRoute
  private updateEntity(req: Request, res: Response) {
    // Does entity exist with ID
    let data = {}
    try {
      data = db.getData(`/${this.name}/${req.params.id}`);
    } catch (err) {
      res.status(404).json({ error: "Object does not exist" });
      return;
    }

    // Update Object with new values
    let updatedData = req.body;
    let updatedObj = EntityFactory.fromPersistenceObject(data, this.classRef);
    const propKeys = Object.keys(updatedData);
    for (const propKey of propKeys) {
      updatedObj[propKey] = updatedData[propKey];
    }

    // Validate
    let errorMap = validate(updatedObj);
    if (Object.keys(errorMap).length > 0) {
      const output = { errors: errorMap };
      res.status(400).json(output);
      return;
    }

    // Save and Return data
    db.push(`/${this.name}/${req.params.id}`, updatedData, false);
    data = db.getData(`/${this.name}/${req.params.id}`);
    res.json(data);
  }

  @auth("deleter")
  @logRoute
  private deleteEntity(req: Request, res: Response) {
    db.delete(`/${this.name}/${req.params.id}`);
    res.json({});
  }
}
