// noinspection JSUnusedGlobalSymbols

import "express";

declare global {
  namespace Express {
    export interface Request {
      cookies: {
        token?: string;
        [key: string]: string | undefined;
      };
    }

    export interface Response {
      success: (
        message?: string,
        data?: any,
        additionalProps?: Record<string, any>
      ) => void;
      error: (
        message: string,
        statusCode?: number,
        data?: any,
        additionalProps?: Record<string, any>
      ) => void;
    }
  }
}