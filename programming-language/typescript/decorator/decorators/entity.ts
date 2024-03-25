import "reflect-metadata";

export function entity(name: string) {
  return function(constructor: Function) {
    Reflect.defineMetadata("entity:name", name, constructor);
  }
}

export function persist(target: any, propertyKey: string) {
  let objectProperties: string[] = Reflect.getMetadata("entity:properties", target) || [];

  if (!objectProperties.includes(propertyKey)) {
    objectProperties.push(propertyKey);
    Reflect.defineMetadata("entity:properties", objectProperties, target);
  }
}

export function id(target: any, propertyKey: string) {
  Reflect.defineMetadata("entity:id", propertyKey, target);
}
