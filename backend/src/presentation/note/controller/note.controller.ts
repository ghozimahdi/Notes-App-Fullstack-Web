import {Response, Request} from "express";
import {inject} from 'inversify';
import {GetAllNotesUseCase} from '../../../domain/usecase/get-all-notes.use-case';
import {GetNoteByIdUseCase} from '../../../domain/usecase/get-note-by-id.use-case';
import {CreateNoteUseCase} from '../../../domain/usecase/create-note.use-case';
import {UpdateNoteUseCase} from '../../../domain/usecase/update-note.use-case';
import {DeleteNoteUseCase} from '../../../domain/usecase/delete-note.use-case';
import {controller, httpGet, httpPost, httpPut, httpDelete} from 'inversify-express-utils';
import {UpdateNoteInput} from "../../../domain/model/update-note.input";
import validateObjectId from "../../middlewares/validate.object-id";
import {rescue} from "../../rescue";
import {passportAuth} from "../../middlewares/auth.middleware";

@controller('/notes')
export class NoteController {
  constructor(
    @inject(GetAllNotesUseCase) private getAllNotesUseCase: GetAllNotesUseCase,
    @inject(GetNoteByIdUseCase) private getNoteByIdUseCase: GetNoteByIdUseCase,
    @inject(CreateNoteUseCase) private createNoteUseCase: CreateNoteUseCase,
    @inject(UpdateNoteUseCase) private updateNoteUseCase: UpdateNoteUseCase,
    @inject(DeleteNoteUseCase) private deleteNoteUseCase: DeleteNoteUseCase
  ) {}

  @httpGet('/', passportAuth)
  @rescue('Failed to fetch notes')
  async getAllNotes(_: Request, res: Response) {
    const result = await this.getAllNotesUseCase.execute();
    return res.success(result);
  }

  @httpGet('/:id', validateObjectId, passportAuth)
  @rescue('Failed to fetch a note')
  async getNoteById(req: Request, res: Response) {
    const id = String(req.params.id);
    if (!id) {
      return res.errorBadRequest("The provided ID is invalid. Please provide an ID.");
    }

    const result = await this.getNoteByIdUseCase.execute(id);
    if (!result.id) {
      return res.errorNotFound(`Note with id: ${id} not found`);
    }

    return res.success(result);
  }

  @httpPost('/', passportAuth)
  @rescue('Failed to create a note')
  async createNote(req: Request, res: Response) {
    const input: UpdateNoteInput = req.body;

    const requiredFields = [input.title, input.body];
    if (requiredFields.some((field) => !field?.trim())) {
      return res.errorBadRequest("Title and body are required");
    }

    const result = await this.createNoteUseCase.execute(input);
    return res.success(result);
  }

  @httpPut('/:id', validateObjectId, passportAuth)
  @rescue('Failed to update noted, please try again!')
  async updateNote(req: Request, res: Response) {
    const id = String(req.params.id);
    const {title, body, archived, noteType} = req.body;

    const input: UpdateNoteInput = {
      id, title, body, archived, noteType,
    }

    if (!id) {
      return res.errorBadRequest("The provided ID is invalid. Please provide an ID.")
    }

    const result = await this.updateNoteUseCase.execute(input);

    if (!result.id) {
      return res.errorNotFound(`Note with id: ${id} not found`);
    }

    return res.success('Success update note', result);
  }

  @httpDelete('/:id', validateObjectId, passportAuth)
  @rescue('Failed to delete noted, please try again!')
  async deleteNote(req: Request, res: Response) {
    const id = String(req.params.id);

    if (!id) {
      return res.errorBadRequest("The provided ID is invalid. Please provide an ID.");
    }

    const result = await this.deleteNoteUseCase.execute(id);

    if (!result) {
      return res.errorNotFound(`Note with id: ${id} not found`);
    }

    return res.success('Successfully delete noted');
  }
}