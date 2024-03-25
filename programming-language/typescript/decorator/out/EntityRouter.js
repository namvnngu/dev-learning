"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const uuid = __importStar(require("uuid"));
const express_1 = __importDefault(require("express"));
const BaseEntity_1 = require("./entities/BaseEntity");
const decorators_1 = require("./decorators");
class EntityRouter {
    constructor(name, classRef) {
        this.name = name;
        this.classRef = classRef;
        this._router = express_1.default.Router();
        this.addEntityRoutes();
    }
    get router() {
        return this._router;
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
    fetchAllEntities(req, res) {
        let data = {};
        data = app_1.db.getData(`/${this.name}`);
        res.json(data);
    }
    fetchEntity(req, res) {
        let data = {};
        data = app_1.db.getData(`/${this.name}/${req.params.id}`);
        res.json(data);
    }
    createEntity(req, res) {
        let newEntity = BaseEntity_1.EntityFactory.fromPersistenceObject(req.body, this.classRef);
        let errorMap = (0, decorators_1.validate)(newEntity);
        if (Object.keys(errorMap).length > 0) {
            const output = { errors: errorMap };
            res.status(400).json(output);
            return;
        }
        const idProperty = Reflect.getMetadata("entity:id", newEntity);
        newEntity[idProperty] = uuid.v4();
        app_1.db.push(`/${this.name}/${newEntity[idProperty]}`, newEntity.getPersistenceObject());
        res.status(200).json(newEntity);
    }
    updateEntity(req, res) {
        // Does entity exist with ID
        let data = {};
        try {
            data = app_1.db.getData(`/${this.name}/${req.params.id}`);
        }
        catch (err) {
            res.status(404).json({ error: "Object does not exist" });
            return;
        }
        // Update Object with new values
        let updatedData = req.body;
        let updatedObj = BaseEntity_1.EntityFactory.fromPersistenceObject(data, this.classRef);
        const propKeys = Object.keys(updatedData);
        for (const propKey of propKeys) {
            updatedObj[propKey] = updatedData[propKey];
        }
        // Validate
        let errorMap = (0, decorators_1.validate)(updatedObj);
        if (Object.keys(errorMap).length > 0) {
            const output = { errors: errorMap };
            res.status(400).json(output);
            return;
        }
        // Save and Return data
        app_1.db.push(`/${this.name}/${req.params.id}`, updatedData, false);
        data = app_1.db.getData(`/${this.name}/${req.params.id}`);
        res.json(data);
    }
    deleteEntity(req, res) {
        app_1.db.delete(`/${this.name}/${req.params.id}`);
        res.json({});
    }
}
__decorate([
    (0, decorators_1.auth)("reader"),
    decorators_1.logRoute,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EntityRouter.prototype, "fetchAllEntities", null);
__decorate([
    (0, decorators_1.auth)("reader"),
    decorators_1.logRoute,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EntityRouter.prototype, "fetchEntity", null);
__decorate([
    (0, decorators_1.auth)("writer"),
    decorators_1.logRoute,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EntityRouter.prototype, "createEntity", null);
__decorate([
    (0, decorators_1.auth)("writer"),
    decorators_1.logRoute,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EntityRouter.prototype, "updateEntity", null);
__decorate([
    (0, decorators_1.auth)("deleter"),
    decorators_1.logRoute,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EntityRouter.prototype, "deleteEntity", null);
exports.default = EntityRouter;
//# sourceMappingURL=EntityRouter.js.map