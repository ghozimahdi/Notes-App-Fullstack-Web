// noinspection JSUnusedGlobalSymbols

import dotenv from 'dotenv';

enum Flavor {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
}

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({path: envFile});

const appConfig = {
  cookiesSecretKey: process.env.COOKIES_SECRET_KEY,
  flavor: (process.env.NODE_ENV as Flavor) || Flavor.DEVELOPMENT,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost/note_db_default',
};

export {Flavor, appConfig}