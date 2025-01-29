// noinspection JSUnusedGlobalSymbols

import dotenv from 'dotenv';

enum Flavor {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
}

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({path: envFile});

function getEnvVariable(name: string): string {
  const value = process.env[name];
  if (value === undefined) {
    throw new Error(`Environment variable "${name}" is not set`);
  }
  return value;
}

function getFlavor(): Flavor {
  const value = process.env.NODE_ENV;
  if (value === Flavor.DEVELOPMENT || value === Flavor.STAGING || value === Flavor.PRODUCTION) {
    return value as Flavor;
  }
  throw new Error(`Invalid or missing NODE_ENV: "${value}"`);
}

const appConfig = {
  cookiesSecretKey: getEnvVariable("SESSION_SECRET"),
  flavor: getFlavor(),
  mongodbUri: getEnvVariable("MONGODB_URI"),
  redisHost: getEnvVariable("REDIS_HOST"),
  jwtSecret: getEnvVariable("JWT_SECRET"),
  tokenExpiration: getEnvVariable("TOKEN_EXPIRATION"),
};


export {Flavor, appConfig}