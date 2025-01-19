import express from 'express';
import NoteRoutes from "./presentation/routes/NoteRoutes";
import error_handler from "./presentation/middlewares/error-handler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(error_handler)

app.use('/api', NoteRoutes);

export default app;