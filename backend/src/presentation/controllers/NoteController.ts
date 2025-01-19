import {Request, Response} from 'express';
import NoteRepository from "../../data/respository/NoteRepository";


class NoteController {
    getAllNotes(req: Request, res: Response) {
        const notes = NoteRepository.getAllNotes();
        res.status(200).json(notes);
    }

    getNoteById(req: Request, res: Response) {
        const {id} = req.params;
        const note = NoteRepository.getNoteById(Number(id));
        if (!note) {
            res.status(404).json({message: 'Note not found'});
            return;
        }
        res.status(200).json(note);
    }

    createNote(req: Request, res: Response) {
        const {title, body, createdAt, archived} = req.body;
        const newNote = NoteRepository.createNote({title, body, createdAt, archived});
        res.status(201).json(newNote);
    }

    updateNote(req: Request, res: Response) {
        const {id} = req.params;
        const updatedNote = req.body;
        const note = NoteRepository.updateNote(Number(id), updatedNote);
        if (!note) {
            res.status(404).json({message: 'Note not found'});
            return;
        }
        res.status(200).json(note);
    }

    deleteNote(req: Request, res: Response) {
        const {id} = req.params;
        const isDeleted = NoteRepository.deleteNote(Number(id));
        if (!isDeleted) {
            res.status(404).json({message: 'Note not found'});
            return;
        }
        res.status(204).send();
    }
}

export default new NoteController();