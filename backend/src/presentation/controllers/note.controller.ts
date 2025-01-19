import {Request, Response} from 'express';
import {inject} from 'inversify';
import {GetAllNotesUseCase} from '../../domain/usecase/get-all-notes.use-case';
import {GetNoteByIdUseCase} from '../../domain/usecase/get-note-by-id.use-case';
import {CreateNoteUseCase} from '../../domain/usecase/create-note.use-case';
import {UpdateNoteUseCase} from '../../domain/usecase/update-note.use-case';
import {DeleteNoteUseCase} from '../../domain/usecase/delete-note.use-case';
import {controller, httpGet, httpPost, httpPut, httpDelete} from 'inversify-express-utils';

@controller('/notes')
export class NoteController {
  constructor(
    @inject(GetAllNotesUseCase) private getAllNotesUseCase: GetAllNotesUseCase,
    @inject(GetNoteByIdUseCase) private getNoteByIdUseCase: GetNoteByIdUseCase,
    @inject(CreateNoteUseCase) private createNoteUseCase: CreateNoteUseCase,
    @inject(UpdateNoteUseCase) private updateNoteUseCase: UpdateNoteUseCase,
    @inject(DeleteNoteUseCase) private deleteNoteUseCase: DeleteNoteUseCase
  ) {}

  @httpGet('/')
  async getAllNotes(_: Request, res: Response) {
    try {
      const notes = await this.getAllNotesUseCase.execute();
      res.status(200).json(notes);
    } catch (error) {
      res.status(500).json({
        message: 'Failed to fetch notes',
        error: (error as Error).message,
      });
    }
  }

  @httpGet('/:id')
  async getNoteById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({message: 'Invalid ID'});
      }

      const note = await this.getNoteByIdUseCase.execute(id);
      if (!note) {
        return res.status(404).json({message: 'Note not found'});
      }
      res.status(200).json(note);
    } catch (error) {
      res.status(500).json({
        message: 'Failed to fetch notes',
        error: (error as Error).message,
      });
    }
  }

  @httpPost('/')
  async createNote(req: Request, res: Response) {
    try {
      const {title, body, createdAt, archived} = req.body;

      if (!title || !body) {
        return res.status(400).json({message: 'Title and body are required'});
      }

      const newNote = await this.createNoteUseCase.execute({title, body, createdAt, archived});
      res.status(201).json(newNote);
    } catch (error) {
      res.status(500).json({message: 'Failed to create note', error: (error as Error).message});
    }
  }

  @httpPut('/:id')
  async updateNote(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const updatedNote = req.body;

      if (isNaN(id)) {
        return res.status(400).json({message: 'Invalid ID'});
      }

      const note = await this.updateNoteUseCase.execute(id, updatedNote);
      if (!note) {
        return res.status(404).json({message: 'Note not found'});
      }
      res.status(200).json(note);
    } catch (error) {
      res.status(500).json({message: 'Failed to update note', error: (error as Error).message});
    }
  }

  @httpDelete('/:id')
  async deleteNote(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({message: 'Invalid ID'});
      }

      const isDeleted = await this.deleteNoteUseCase.execute(id);
      if (!isDeleted) {
        return res.status(404).json({message: 'Note not found'});
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({message: 'Failed to delete note', error: (error as Error).message});
    }
  }
}