import express from 'express';
import NoteRoutes from "./presentation/routes/NoteRoutes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', NoteRoutes);

export default app;