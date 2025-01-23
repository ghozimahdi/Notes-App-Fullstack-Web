export enum NoteType {
  A = 'A',
  B = 'B',
  C = 'C',
}

export class NoteData {
  _id?: string;
  title?: string;
  body?: string;
  createdAt?: string;
  archived?: boolean;
  noteType?: NoteType;

  constructor(init?: Partial<NoteData>) {
    Object.assign(this, init);
  }

  static mapNoteType(type: string): NoteType | undefined {
    return Object.values(NoteType).includes(type as NoteType) ? (type as NoteType) : undefined;
  }
}