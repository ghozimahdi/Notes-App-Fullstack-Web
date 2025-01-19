import {Router} from 'express';
import {noteController} from "../../di/di";

export class NoteRoutes {
  static get routes(): Router {
    const router = Router();

    router.get('/notes', noteController.getAllNotes);
    router.get('/notes/:id', noteController.getNoteById);
    router.post('/notes', noteController.createNote);
    router.put('/notes/:id', noteController.updateNote);
    router.delete('/notes/:id', noteController.deleteNote);

    return router;
  }
}
