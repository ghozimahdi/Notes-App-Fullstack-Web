import express from 'express';
import error_handler from "./presentation/middlewares/error.handler";
import {NoteRoutes} from "./presentation/routes/note.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(error_handler)

app.use('/api', NoteRoutes.routes);

export default app;