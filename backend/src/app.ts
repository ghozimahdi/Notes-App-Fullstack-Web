import 'reflect-metadata';
import express from 'express';
import error_handler from "./presentation/middlewares/error.handler";
import {InversifyExpressServer} from "inversify-express-utils";
import {container} from "./inversify.config";
import path from "path";
import {AppDatabase} from "./data/database/app.database";
import {Seeds} from "./seeds";

export class App {
  async start() {
    const appDb = container.get(AppDatabase);
    await appDb.connect();
    await Seeds.initData(appDb)

    const server = new InversifyExpressServer(container, null, {rootPath: '/api'});
    server.setConfig((app) => {
      app.use(express.json());
      app.use(express.urlencoded({extended: true}));
      app.use(express.static(path.join(__dirname, 'public')));
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
