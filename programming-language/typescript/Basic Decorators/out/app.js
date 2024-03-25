var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function logClass(message) {
    console.log(`${message} evaluated`);
    return function (constructor) {
        console.log(`${message} called`);
    };
}
function logProperty(message) {
    console.log(`${message} evaluated`);
    return function (target, propertyKey) {
        console.log(`${message} called`);
    };
}
function logMethod(message) {
    console.log(`${message} evaluated`);
    return function (target, propertyKey, descriptor) {
        console.log(`${message} called`);
    };
}
function logParameter(message) {
    console.log(`${message} evaluated`);
    return function (target, propertyKey, parameterIndex) {
        console.log(`${message} called`);
    };
}
let Person = class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this._directReports = [];
    }
    addDirectReport(person) {
        this._directReports.push(person);
    }
};
__decorate([
    logProperty("Property Decorator"),
    __metadata("design:type", String)
], Person.prototype, "emailAddress", void 0);
__decorate([
    logMethod("Method Decorator"),
    logMethod("Method Decorator 2"),
    __param(0, logParameter("Parameter Decorator")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Person]),
    __metadata("design:returntype", void 0)
], Person.prototype, "addDirectReport", null);
Person = __decorate([
    logClass("Class Decorator"),
    __metadata("design:paramtypes", [String, String])
], Person);
const person = new Person("David", "Tucker");
//# sourceMappingURL=app.js.map