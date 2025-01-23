export class NoteModel {
  id: string = '';
  title: string = '';
  body: string = '';
  createdAt: string = '';
  archived: boolean = false;

  constructor(init?: Partial<NoteModel>) {
    Object.assign(this, init);
  }
}