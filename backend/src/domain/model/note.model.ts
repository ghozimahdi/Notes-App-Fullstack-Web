export class NoteModel {
  id: number = 0;
  title: string = '';
  body: string = '';
  createdAt: string = '';
  archived: boolean = false;

  constructor(init?: Partial<NoteModel>) {
    Object.assign(this, init);
  }
}