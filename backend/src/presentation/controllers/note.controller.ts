import {Request, Response} from 'express';
import {inject} from 'inversify';
import {GetAllNotesUseCase} from '../../domain/usecase/get-all-notes.use-case';
import {GetNoteByIdUseCase} from '../../domain/usecase/get-note-by-id.use-case';
import {CreateNoteUseCase} from '../../domain/usecase/create-note.use-case';
import {UpdateNoteUseCase} from '../../domain/usecase/update-note.use-case';
import {DeleteNoteUseCase} from '../../domain/usecase/delete-note.use-case';
import {controller, httpGet, httpPost, httpPut, httpDelete} from 'inversify-express-utils';
import {handleError} from "../../domain/model/exception";
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
    try {
      const result = await this.getAllNotesUseCase.execute();
      res.status(200).json({
        success: true,
        message: "Succeed",
        data: result,
      });
    } catch (e) {
      handleError("Failed to fetch notes", e)
    }
  }

  @httpGet('/:id')
  async getNoteById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: "The provided ID is invalid. Please provide a numeric ID.",
          data: null,
        });
      }

      const result = await this.getNoteByIdUseCase.execute(id);
      if (result.id == 0) {
        res.status(404).json({
          success: false,
          message: `Note with id: ${id} not found`,
          data: result,
        });
      }

      res.status(200).json({
        success: true,
        message: "Succeed",
        data: result,
      });
    } catch (e) {
      handleError("Failed to fetch a note", e);
    }
  }

  @httpPost('/')
  async createNote(req: Request, res: Response) {
    try {
      const {title, body, createdAt, archived} = req.body;

      if (!title || !body) {
        res.status(400).json({
          success: false,
          message: "Title and body are required",
          data: null,
        });
      }

      const result = await this.createNoteUseCase.execute({title, body, createdAt, archived});
      res.status(200).json({
        message: "Succeed",
        success: true,
        data: result,
      });
    } catch (e) {
      handleError("Failed to create a note", e);
    }
  }

  @httpPut('/:id')
  async updateNote(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const {title, body, archived} = req.body;

      const input: UpdateNoteInput = {
        id, title, body, archived
      }

      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: "The provided ID is invalid. Please provide a numeric ID.",
          data: null,
        });
      }

      const result = await this.updateNoteUseCase.execute(input);

      if (result.id == 0) {
        res.status(404).json({
          success: false,
          message: `Note with id: ${id} not found`,
          data: result,
        });
      }

      res.status(200).json({
        success: true,
        message: 'Success update note',
        data: result,
      });
    } catch (e) {
      handleError('Failed to update noted, please try again!', e);
    }
  }

  @httpDelete('/:id')
  async deleteNote(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: "The provided ID is invalid. Please provide a numeric ID.",
          data: null,
        });
      }

      const result = await this.deleteNoteUseCase.execute(id);

      if (result) {
        res.status(200).json({
          success: true,
          message: "Successfully delete noted",
          data: result,
        });
      }


      res.status(404).json({
        success: false,
        message: `Note with id: ${id} not found`,
        data: result,
      });
    } catch (e) {
      handleError("Failed to delete noted, please try again!", e);
    }
  }
}