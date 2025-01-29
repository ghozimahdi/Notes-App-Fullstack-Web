import {MongoServerError} from "mongodb";
import {EmailAlreadyRegisteredException, Exception, InternalServerException} from "../domain/model/exception";
import {appConfig, Flavor} from "../env";

export function safeCall() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        const className = target.constructor.name;
        const methodName = propertyKey;

        const isDevelopment = appConfig.flavor !== Flavor.PRODUCTION;

        if (isDevelopment) {
          console.error(`[Error] Class: ${className}`);
          console.error(`[Error] Method: ${methodName}`);
          console.error(`[Error] Details:`, error);
        }

        const message = `[${className}.${methodName}] ${error instanceof Error ? error.message : String(error)}`;

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
    };
  };
}