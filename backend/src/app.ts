import 'reflect-metadata';
import express from 'express';
import error_handler from "./presentation/middlewares/error.handler";
import {NoteRoutes} from "./presentation/routes/note.routes";
import {InversifyExpressServer} from "inversify-express-utils";
import {container} from "./inversify.config";

export class App {
  async start() {
    const server = new InversifyExpressServer(container);
    server.setConfig((app) => {
      app.use(express.json());
      app.use(express.urlencoded({extended: true}));

      app.use(error_handler);
    })
    const app = server.build();

    app.use('/api', NoteRoutes.routes);

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  }
}
