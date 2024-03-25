"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRoute = void 0;
function logRoute(target, propertyKey, descriptor) {
    const original = descriptor.value;
    descriptor.value = function (...args) {
        let req = args[0];
        let res = args[1];
        original.apply(this, args);
        console.log(`${req.ip} [${new Date().toISOString()}] ${req.host} ${req.originalUrl} ${req.method} ${res.statusCode} ${res.statusMessage} HTTP/${req.httpVersion}`);
        if (["PUT", "POST"].indexOf(req.method) > -1) {
            console.log(`\tBODY: ${JSON.stringify(req.body)}`);
        }
    };
}
exports.logRoute = logRoute;
//# sourceMappingURL=log.js.map