import {NoteTypeEnum} from "./note-type.enum";

export class NoteData {
  _id?: string;
  title?: string;
  body?: string;
  createdAt?: string;
  archived?: boolean;
  noteType?: NoteTypeEnum;
  userId?: string;

  constructor(init?: Partial<NoteData>) {
    Object.assign(this, init);
  }
}