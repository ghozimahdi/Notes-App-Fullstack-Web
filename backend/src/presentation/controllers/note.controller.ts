import {NextFunction, Request, Response} from 'express';
import {inject} from 'inversify';
import {GetAllNotesUseCase} from '../../domain/usecase/get-all-notes.use-case';
import {GetNoteByIdUseCase} from '../../domain/usecase/get-note-by-id.use-case';
import {CreateNoteUseCase} from '../../domain/usecase/create-note.use-case';
import {UpdateNoteUseCase} from '../../domain/usecase/update-note.use-case';
import {DeleteNoteUseCase} from '../../domain/usecase/delete-note.use-case';
import {controller, httpGet, httpPost, httpPut, httpDelete, next} from 'inversify-express-utils';
import {BadRequestException, handleError, NotFoundException} from "../../domain/model/exception";
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
  async getAllNotes(_: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.getAllNotesUseCase.execute();
      return res.status(200).json({
        success: true,
        message: "Succeed",
        data: result,
      });
    } catch (e) {
      handleError("Failed to fetch notes", e)
    }
  }

  @httpGet('/:id')
  async getNoteById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      if (!id) {
        return next(new BadRequestException("The provided ID is invalid. Please provide an ID."));
      }

      const result = await this.getNoteByIdUseCase.execute(id);
      if (!result.id) {
        return next(new NotFoundException(`Note with id: ${id} not found`));
      }

      return res.status(200).json({
        success: true,
        message: "Succeed",
        data: result,
      });
    } catch (e) {
      handleError("Failed to fetch a note", e);
    }
  }

  @httpPost('/')
  async createNote(req: Request, res: Response, next: NextFunction) {
    try {
      const input: UpdateNoteInput = req.body;

      const requiredFields = [input.title, input.body];
      if (requiredFields.some((field) => !field?.trim())) {
        return next(new BadRequestException("Title and body are required"));
      }

      const result = await this.createNoteUseCase.execute(input);
      return res.status(200).json({
        message: "Succeed",
        success: true,
        data: result,
      });
    } catch (e) {
      handleError("Failed to create a note", e);
    }
  }

  @httpPut('/:id')
  async updateNote(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const {title, body, archived, noteType} = req.body;

      const input: UpdateNoteInput = {
        id, title, body, archived, noteType,
      }

      if (!id) {
        return next(new BadRequestException("The provided ID is invalid. Please provide an ID."));
      }

      const result = await this.updateNoteUseCase.execute(input);

      if (!result.id) {
        return next(new NotFoundException(`Note with id: ${id} not found`));
      }

      return res.status(200).json({
        success: true,
        message: 'Success update note',
        data: result,
      });
    } catch (e) {
      handleError('Failed to update noted, please try again!', e);
    }
  }

  @httpDelete('/:id')
  async deleteNote(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);

      if (!id) {
        return next(new BadRequestException("The provided ID is invalid. Please provide an ID."))
      }

      const result = await this.deleteNoteUseCase.execute(id);

      if (!result) {
        return next(new NotFoundException(`Note with id: ${id} not found`))
      }

      return res.status(200).json({
        success: true,
        message: "Successfully delete noted",
        data: null,
      });
    } catch (e) {
      handleError("Failed to delete noted, please try again!", e);
    }
  }
}