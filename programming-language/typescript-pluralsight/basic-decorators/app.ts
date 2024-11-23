function logClass(message: string): ClassDecorator {
    console.log(`${message} evaluated`);
    return function (_constructor: Function): void {
        console.log(`${message} called`);
    }
}

function logProperty(message: string): PropertyDecorator {
    console.log(`${message} evaluated`);
    return function (_target: Object, _propertyKey: string): void {
        console.log(`${message} called`);
    }
}

function logMethod(message: string): MethodDecorator {
    console.log(`${message} evaluated`);
    return function (_target: Object, _propertyKey: string, _descriptor: PropertyDescriptor): void {
        console.log(`${message} called`);
    }
}

function logParameter(message: string): ParameterDecorator {
    console.log(`${message} evaluated`);
    return function (_target: Object, _propertyKey: string, _parameterIndex: number): void {
        console.log(`${message} called`);
    }
}

@logClass("Class Decorator")
class Person {

    private _directReports: Person[];

    @logProperty("Property Decorator")
    public emailAddress: string;

    constructor(public firstName: string, public lastName: string) {
        this._directReports = [];
    }

    @logMethod("Method Decorator")
    @logMethod("Method Decorator 2")
    public addDirectReport(@logParameter("Parameter Decorator") person: Person) {
        this._directReports.push(person);
    }

}

const person = new Person("David", "Tucker");
