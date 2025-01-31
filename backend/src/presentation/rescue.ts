import {Response, Request} from "express";
import {appConfig, Flavor} from "../config/env";
import {EmailAlreadyRegisteredException, InvalidTokenException, TokenExpiredException} from "../domain/model/exception";

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
          console.error(`[Error] Request Body:`, req.body);
          console.error(`[Error] Request Params:`, req.params);
          console.error(`[Error] Details:`, error);
        }

        if (error instanceof EmailAlreadyRegisteredException) {
          return res.errorBadRequest('Email is already registered.');
        }

        if (error instanceof TokenExpiredException || error instanceof InvalidTokenException) {
          return res.error(401, 'Invalid or expired token.');
        }

        return res.errorServer(
          message ?? `Internal Server Error${isDevelopment ? `: ${defaultMessage}` : ''}`,
          undefined
        );
      }
    };
  };
}