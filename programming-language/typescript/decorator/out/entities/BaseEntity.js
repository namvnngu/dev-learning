"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityFactory = void 0;
require("reflect-metadata");
class EntityFactory {
    static fromPersistenceObject(obj, type) {
        let output = new type();
        const persistedProperties = Reflect.getMetadata("entity:properties", output) || [];
        const idProperty = Reflect.getMetadata("entity:id", output);
        const props = Object.keys(obj);
        for (const prop of props) {
            if (persistedProperties.includes(prop) || prop == idProperty) {
                output[prop] = obj[prop];
            }
            else {
                throw new Error("Property not defined in class.");
            }
        }
        return output;
    }
}
exports.EntityFactory = EntityFactory;
class BaseEntity {
    getPersistenceObject() {
        let output = {};
        const persistedProperties = Reflect.getMetadata("entity:properties", this);
        const idProperty = Reflect.getMetadata("entity:id", this);
        output[idProperty] = this[idProperty];
        for (const prop of persistedProperties) {
            if (this[prop]) {
                output[prop] = this[prop];
            }
        }
        return output;
    }
}
exports.default = BaseEntity;
//# sourceMappingURL=BaseEntity.js.map