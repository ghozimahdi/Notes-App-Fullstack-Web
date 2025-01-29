import 'reflect-metadata';
import express from 'express';
import error_handler from "./presentation/middlewares/error.handler";
import {InversifyExpressServer} from "inversify-express-utils";
import {container} from "./inversify.config";
import path from "path";
import {AppDatabase} from "./data/database/app.database";
import {Seeds} from "./seeds";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import {responseEnhancer} from "./presentation/middlewares/response.enhancer";
import {appConfig, Flavor} from "./env";
import {SessionManager} from "./data/session.manager";
import session from "express-session";

export class App {
  async start() {
    const appDb = container.get(AppDatabase);
    await appDb.connect();

    const sessionManager = container.get(SessionManager);
    const sessionOption = await sessionManager.createSession();

    if (appConfig.flavor === Flavor.DEVELOPMENT) {
      await Seeds.initData(appDb)
    }

    const server = new InversifyExpressServer(container, null, {rootPath: '/api'});
    server.setConfig((app) => {
      app.use(express.json({limit: '10kb'}));
      app.use(express.urlencoded({extended: true}));
      app.use(express.static(path.join(__dirname, 'public')));

      if (appConfig.flavor !== Flavor.PRODUCTION) {
        app.use(morgan('dev'));
      }

      app.use(responseEnhancer);
      app.use(cookieParser(appConfig.cookiesSecretKey));
      app.use(session(sessionOption));
    })

    server.setErrorConfig((app) => {
      app.use((_, res) => {
        res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
      });

      app.use(error_handler);
    });

    const app = server.build();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  }
}
