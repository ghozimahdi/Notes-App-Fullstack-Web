import {MongoServerError} from "mongodb";
import {
  EmailAlreadyRegisteredException,
  Exception,
  InternalServerException,
  InvalidTokenException, TokenExpiredException
} from "../domain/model/exception";
import {appConfig, Flavor} from "../config/env";

export function safeCall() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      try {
        const result = originalMethod.apply(this, args);

        if (result instanceof Promise) {
          return result.catch((error: any) => handleError(error, target, propertyKey));
        }

        return result;
      } catch (error) {
        handleError(error, target, propertyKey);
      }
    };
  };
}

function handleError(error: any, target: any, propertyKey: string) {
  const className = target.constructor.name;
  const methodName = propertyKey;

  const isDevelopment = appConfig.flavor !== Flavor.PRODUCTION;

  if (isDevelopment) {
    console.error(`[Error] Class: ${className}`);
    console.error(`[Error] Method: ${methodName}`);
    console.error(`[Error] Details:`, error);
  }

  const message = `[${className}.${methodName}] ${
    error instanceof Error ? error.message : String(error)
  }`;

  if (error.name === "TokenExpiredError") {
    throw new TokenExpiredException();
  }

  if (error.name === "JsonWebTokenError") {
    throw new InvalidTokenException();
  }

  if (error instanceof MongoServerError) {
    switch (error.code) {
      case 11000:
        throw new EmailAlreadyRegisteredException();
    }
  }

  if (error instanceof Exception) {
    throw error;
  }

  throw new InternalServerException(isDevelopment ? message : undefined);
}