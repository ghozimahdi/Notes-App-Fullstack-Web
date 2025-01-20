import 'reflect-metadata';
import express from 'express';
import error_handler from "./presentation/middlewares/error.handler";
import {InversifyExpressServer} from "inversify-express-utils";
import {container} from "./inversify.config";

export class App {
  async start() {
    const server = new InversifyExpressServer(container, null, {rootPath: '/api'});
    server.setConfig((app) => {
      app.use(express.json());
      app.use(express.urlencoded({extended: true}));
    })

    server.setErrorConfig((app) => {
      app.use(error_handler);
    });

    const app = server.build();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  }
}
