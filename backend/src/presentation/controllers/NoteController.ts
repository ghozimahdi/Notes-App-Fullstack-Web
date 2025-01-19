import {Request, Response} from 'express';
import getAllNotesUseCase from "../../domain/GetAllNotesUseCase";
import getNoteByIdUseCase from "../../domain/GetNoteByIdUseCase";
import createNoteUseCase from "../../domain/CreateNoteUseCase";
import updateNoteUseCase from "../../domain/UpdateNoteUseCase";
import deleteNoteUseCase from "../../domain/DeleteNoteUseCase"

class NoteController {

    getAllNotes(_: Request, res: Response) {
        const notes = getAllNotesUseCase.execute();
        res.status(200).json(notes);
    }

    getNoteById(req: Request, res: Response) {
        const {id} = req.params;
        const note = getNoteByIdUseCase.execute(Number(id));
        if (!note) {
            res.status(404).json({message: 'Note not found'});
            return;
        }
        res.status(200).json(note);
    }

    createNote(req: Request, res: Response) {
        const {title, body, createdAt, archived} = req.body;
        const newNote = createNoteUseCase.execute({title, body, createdAt, archived});
        res.status(201).json(newNote);
    }

    updateNote(req: Request, res: Response) {
        const {id} = req.params;
        const updatedNote = req.body;
        const note = updateNoteUseCase.execute(Number(id), updatedNote);
        if (!note) {
            res.status(404).json({message: 'Note not found'});
            return;
        }
        res.status(200).json(note);
    }

    deleteNote(req: Request, res: Response) {
        const {id} = req.params;
        const isDeleted = deleteNoteUseCase.execute(Number(id));
        if (!isDeleted) {
            res.status(404).json({message: 'Note not found'});
            return;
        }
        res.status(204).send();
    }
}

export default new NoteController();