import {Response, Request} from "express";
import {appConfig, Flavor} from "../env";

export function rescue(message?: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: Request, res: Response, ...args: any[]) {
      try {
        return await originalMethod.apply(this, [req, res, ...args]);
      } catch (error) {
        const className = target.constructor.name;
        const methodName = propertyKey;

        const isDevelopment = appConfig.flavor !== Flavor.PRODUCTION;

        const defaultMessage = `[${className}.${methodName}] ${error instanceof Error ? error.message : String(error)}`;

        if (isDevelopment) {
          console.error(`[Error] Controller: ${className}`);
          console.error(`[Error] Method: ${methodName}`);
          console.error(`[Error] Request Body:`, req);
          console.error(`[Error] Details:`, error);
        }

        res.errorServer(
          message || 'Internal Server Error',
          undefined,
          isDevelopment ? {error: defaultMessage} : undefined,
        );
      }
    };
  };
}