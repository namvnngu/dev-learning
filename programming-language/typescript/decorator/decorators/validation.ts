
import validator from 'validator';
import "reflect-metadata";

type ValidationFunction = (target: any, propertyKey: string, validatorOptions?: any) => string | void;

interface ValidationRule {
  validationOptions?: any;
  validator: ValidationFunction;
}

export function validate(object: any) {
  const keys = Reflect.getMetadata("validation:properties", object) as string[];
  let errorMap = {};

  if (!keys || !Array.isArray(keys)) {
    return errorMap;
  }

  for (const key of keys) {
    const rules: ValidationRule[] = Reflect.getMetadata("validation:rules", object, key) as ValidationRule[];
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

export function isEmail(target: any, propertyKey: string) {
  addValidation(target, propertyKey, emailValidatior);
}

export function required(target: any, propertyKey: string) {
  addValidation(target, propertyKey, requiredValidatior);
}

export function length(minimum: Number, maximum: Number) {
  const options = {
    minimum: minimum,
    maximum: maximum
  };
  return function(target: any, propertyKey: string) {
    addValidation(target, propertyKey, lengthValidator, options);
  }
}

export function isPhone(target: any, propertyKey: string) {
  addValidation(target, propertyKey, phoneValidator);
}

export function isInteger(minimum: Number, maximum: Number) {
  const options = {
    minimum: minimum,
    maximum: maximum
  };
  return function(target: any, propertyKey: string) {
    addValidation(target, propertyKey, integerValidator, options);
  }
}

function addValidation(target: any, propertyKey: string, validator: ValidationFunction, validationOptions?: any) {
  // Make sure we have the list of all properties for the object
  let objectProperties: string[] = Reflect.getMetadata("validation:properties", target) || [];
  if (!objectProperties.includes(propertyKey)) {
    objectProperties.push(propertyKey);
    Reflect.defineMetadata("validation:properties", objectProperties, target);
  }

  // Make sure we capture validation rule
  let validators: ValidationRule[] = Reflect.getMetadata("validation:rules", target, propertyKey) || [];
  let validationRule = {
    validator: validator,
    validationOptions: validationOptions
  };
  validators.push(validationRule);
  Reflect.defineMetadata("validation:rules", validators, target, propertyKey);
}

// VALIDATOR FUNCTIONS

function emailValidatior(target: any, propertyKey: string): string | void {
  let value = target[propertyKey];
  if (value == null) {
    return;
  }
  const isValid = validator.isEmail(value);
  if (!isValid) {
    return `Property ${propertyKey} must be a valid email.`
  }
  return;
}

function requiredValidatior(target: any, propertyKey: string): string | void {
  let value = target[propertyKey];
  if (value) {
    return;
  }
  return `Property ${propertyKey} is required.`
}

function integerValidator(target: any, propertyKey: string, validatorOptions: any): string | void {
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

function lengthValidator(target: any, propertyKey: string, validatorOptions: any): string | void {
  const options = {
    min: validatorOptions.minimum,
    max: validatorOptions.maximum
  };
  const isValid = validator.isLength(target[propertyKey] + '', options);
  if (!isValid) {
    return `Property ${propertyKey} must be a string between ${validatorOptions.minimum} and ${validatorOptions.maximum} in length`;
  }
  return;
}

function phoneValidator(target: any, propertyKey, validationOptions: any): string | void {
  let value = target[propertyKey];
  if (value == null) {
    return;
  }
  const isValid = validator.isMobilePhone(value);
  if (!isValid) {
    return `Property ${propertyKey} must be a valid phone number.`
  }
  return;
}
