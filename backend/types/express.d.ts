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
      success(message: string): void;

      success(data: any): void;

      success(
        data: any,
        additionalProps?: Record<string, any>
      ): void;

      success(
        message: string,
        data: any,
        additionalProps?: Record<string, any>
      ): void;

      error: (
        statusCode?: number,
        message: string,
        data?: any,
        additionalProps?: Record<string, any>
      ) => void;

      errorServer: (
        message: string,
        data?: any,
        additionalProps?: Record<string, any>
      ) => void;

      errorBadRequest: (
        message?: string,
        data?: any,
        additionalProps?: Record<string, any>
      ) => void;

      errorNotFound: (
        message?: string,
        data?: any,
        additionalProps?: Record<string, any>
      ) => void;
    }
  }
}