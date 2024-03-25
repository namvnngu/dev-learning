"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInteger = exports.isPhone = exports.length = exports.required = exports.isEmail = exports.validate = void 0;
const validator_1 = __importDefault(require("validator"));
require("reflect-metadata");
function validate(object) {
    const keys = Reflect.getMetadata("validation:properties", object);
    let errorMap = {};
    if (!keys || !Array.isArray(keys)) {
        return errorMap;
    }
    for (const key of keys) {
        const rules = Reflect.getMetadata("validation:rules", object, key);
        if (!Array.isArray(rules)) {
            continue;
        }
        for (const rule of rules) {
            const errorMessage = rule.validator(object, key, rule.validationOptions);
            if (errorMessage) {
                errorMap[key] = errorMap[key] || [];
                errorMap[key].push(errorMessage);
            }
        }
    }
    return errorMap;
}
exports.validate = validate;
function isEmail(target, propertyKey) {
    addValidation(target, propertyKey, emailValidatior);
}
exports.isEmail = isEmail;
function required(target, propertyKey) {
    addValidation(target, propertyKey, requiredValidatior);
}
exports.required = required;
function length(minimum, maximum) {
    const options = {
        minimum: minimum,
        maximum: maximum
    };
    return function (target, propertyKey) {
        addValidation(target, propertyKey, lengthValidator, options);
    };
}
exports.length = length;
function isPhone(target, propertyKey) {
    addValidation(target, propertyKey, phoneValidator);
}
exports.isPhone = isPhone;
function isInteger(minimum, maximum) {
    const options = {
        minimum: minimum,
        maximum: maximum
    };
    return function (target, propertyKey) {
        addValidation(target, propertyKey, integerValidator, options);
    };
}
exports.isInteger = isInteger;
function addValidation(target, propertyKey, validator, validationOptions) {
    // Make sure we have the list of all properties for the object
    let objectProperties = Reflect.getMetadata("validation:properties", target) || [];
    if (!objectProperties.includes(propertyKey)) {
        objectProperties.push(propertyKey);
        Reflect.defineMetadata("validation:properties", objectProperties, target);
    }
    // Make sure we capture validation rule
    let validators = Reflect.getMetadata("validation:rules", target, propertyKey) || [];
    let validationRule = {
        validator: validator,
        validationOptions: validationOptions
    };
    validators.push(validationRule);
    Reflect.defineMetadata("validation:rules", validators, target, propertyKey);
}
// VALIDATOR FUNCTIONS
function emailValidatior(target, propertyKey) {
    let value = target[propertyKey];
    if (value == null) {
        return;
    }
    const isValid = validator_1.default.isEmail(value);
    if (!isValid) {
        return `Property ${propertyKey} must be a valid email.`;
    }
    return;
}
function requiredValidatior(target, propertyKey) {
    let value = target[propertyKey];
    if (value) {
        return;
    }
    return `Property ${propertyKey} is required.`;
}
function integerValidator(target, propertyKey, validatorOptions) {
    const value = target[propertyKey];
    if (value == null) {
        return;
    }
    const errorMessage = `Property ${propertyKey} must be an integer between ${validatorOptions.minimum} and ${validatorOptions.maximum}`;
    if (!Number.isInteger(value)) {
        return errorMessage;
    }
    if (value <= validatorOptions.maximum && value >= validatorOptions.minimum) {
        return;
    }
    return errorMessage;
}
function lengthValidator(target, propertyKey, validatorOptions) {
    const options = {
        min: validatorOptions.minimum,
        max: validatorOptions.maximum
    };
    const isValid = validator_1.default.isLength(target[propertyKey] + '', options);
    if (!isValid) {
        return `Property ${propertyKey} must be a string between ${validatorOptions.minimum} and ${validatorOptions.maximum} in length`;
    }
    return;
}
function phoneValidator(target, propertyKey, validationOptions) {
    let value = target[propertyKey];
    if (value == null) {
        return;
    }
    const isValid = validator_1.default.isMobilePhone(value);
    if (!isValid) {
        return `Property ${propertyKey} must be a valid phone number.`;
    }
    return;
}
//# sourceMappingURL=validation.js.map