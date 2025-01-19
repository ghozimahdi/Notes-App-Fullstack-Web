import {Request, Response} from 'express';
import {GetNoteByIdUseCase} from "../../domain/usecase/get-note-by-id.use-case";
import {GetAllNotesUseCase} from "../../domain/usecase/get-all-notes.use-case";
import {CreateNoteUseCase} from "../../domain/usecase/create-note.use-case";
import {UpdateNoteUseCase} from "../../domain/usecase/update-note.use-case";
import {DeleteNoteUseCase} from "../../domain/usecase/delete-note.use-case";
import {inject, injectable} from "inversify";

@injectable()
export class NoteController {

  constructor(@inject(GetAllNotesUseCase) private getAllNotesUseCase: GetAllNotesUseCase,
              @inject(GetNoteByIdUseCase) private getNoteByIdUseCase: GetNoteByIdUseCase,
              @inject(CreateNoteUseCase) private createNoteUseCase: CreateNoteUseCase,
              @inject(UpdateNoteUseCase) private updateNoteUseCase: UpdateNoteUseCase,
              @inject(DeleteNoteUseCase) private deleteNoteUseCase: DeleteNoteUseCase) {}

  getAllNotes(_: Request, res: Response) {
    const notes = this.getAllNotesUseCase.execute();
    res.status(200).json(notes);
  }

  getNoteById(req: Request, res: Response) {
    const {id} = req.params;
    const note = this.getNoteByIdUseCase.execute(Number(id));
    if (!note) {
      res.status(404).json({message: 'NoteModel not found'});
      return;
    }
    res.status(200).json(note);
  }

  createNote(req: Request, res: Response) {
    const {title, body, createdAt, archived} = req.body;
    const newNote = this.createNoteUseCase.execute({title, body, createdAt, archived});
    res.status(201).json(newNote);
  }

  updateNote(req: Request, res: Response) {
    const {id} = req.params;
    const updatedNote = req.body;
    const note = this.updateNoteUseCase.execute(Number(id), updatedNote);
    if (!note) {
      res.status(404).json({message: 'NoteModel not found'});
      return;
    }
    res.status(200).json(note);
  }

  deleteNote(req: Request, res: Response) {
    const {id} = req.params;
    const isDeleted = this.deleteNoteUseCase.execute(Number(id));
    if (!isDeleted) {
      res.status(404).json({message: 'NoteModel not found'});
      return;
    }
    res.status(204).send();
  }
}
