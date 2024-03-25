import { Request, Response } from "express";

export function logRoute(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function(...args: any[]) {
    let req = args[0] as Request;
    let res = args[1] as Response;
    original.apply(this, args);
    console.log(`${req.ip} [${new Date().toISOString()}] ${req.host} ${req.originalUrl} ${req.method} ${res.statusCode} ${res.statusMessage} HTTP/${req.httpVersion}`);
    if (["PUT", "POST"].indexOf(req.method) > -1) {
      console.log(`\tBODY: ${JSON.stringify(req.body)}`);
    }
  }
}
