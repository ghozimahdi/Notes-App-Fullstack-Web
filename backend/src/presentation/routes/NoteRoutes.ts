import {Router} from 'express';
import NoteController from '../controllers/NoteController';

const router = Router();

router.get('/notes', NoteController.getAllNotes);
router.get('/notes/:id', NoteController.getNoteById);
router.post('/notes', NoteController.createNote);
router.put('/notes/:id', NoteController.updateNote);
router.delete('/notes/:id', NoteController.deleteNote);

export default router;