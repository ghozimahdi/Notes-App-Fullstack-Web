import {Router} from 'express';
import {container} from "../../inversify.config";
import {NoteController} from "../controllers/note.controller";

export class NoteRoutes {
  static get routes(): Router {
    const noteController = container.get(NoteController);
    const router = Router();

    router.get('/notes', noteController.getAllNotes.bind(noteController));
    // router.get('/notes/:id', noteController.getNoteById);
    // router.post('/notes', noteController.createNote);
    // router.put('/notes/:id', noteController.updateNote);
    // router.delete('/notes/:id', noteController.deleteNote);

    return router;
  }
}
