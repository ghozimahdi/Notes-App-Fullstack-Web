import {Request, Response} from 'express';
import {inject} from 'inversify';
import {GetAllNotesUseCase} from '../../domain/usecase/get-all-notes.use-case';
import {GetNoteByIdUseCase} from '../../domain/usecase/get-note-by-id.use-case';
import {CreateNoteUseCase} from '../../domain/usecase/create-note.use-case';
import {UpdateNoteUseCase} from '../../domain/usecase/update-note.use-case';
import {DeleteNoteUseCase} from '../../domain/usecase/delete-note.use-case';
import {controller, httpGet, httpPost, httpPut, httpDelete} from 'inversify-express-utils';
import {BadRequestException} from "../../domain/model/exception";
import {UpdateNoteInput} from "../../domain/model/update-note.input";

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
    const result = await this.getAllNotesUseCase.execute();
    res.status(200).json(result);
  }

  @httpGet('/:id')
  async getNoteById(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      throw new BadRequestException('Invalid ID')
    }

    const note = await this.getNoteByIdUseCase.execute(id);
    res.status(200).json(note);
  }

  @httpPost('/')
  async createNote(req: Request, res: Response) {
    const {title, body, createdAt, archived} = req.body;

    if (!title || !body) {
      throw new BadRequestException('Title and body are required')
    }

    const newNote = await this.createNoteUseCase.execute({title, body, createdAt, archived});
    res.status(201).json(newNote);
  }

  @httpPut('/:id')
  async updateNote(req: Request, res: Response) {
    const id = Number(req.params.id);
    const {title, body, archived} = req.body;

    const input: UpdateNoteInput = {
      id, title, body, archived
    }

    if (isNaN(id)) {
      throw new BadRequestException('Invalid ID')
    }

    const note = await this.updateNoteUseCase.execute(input);
    res.status(200).json(note);
  }

  @httpDelete('/:id')
  async deleteNote(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new BadRequestException('Invalid ID')
    }

    const result = await this.deleteNoteUseCase.execute(id);
    res.status(204).json(result);
  }
}