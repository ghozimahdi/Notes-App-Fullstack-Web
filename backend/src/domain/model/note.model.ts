export class NoteModel {
  id: string = '';
  title: string = '';
  body: string = '';
  createdAt: string = '';
  archived: boolean = false;
  noteType: string = '';
  userId: string = '';

  constructor(init?: Partial<NoteModel>) {
    Object.assign(this, init);
  }
}