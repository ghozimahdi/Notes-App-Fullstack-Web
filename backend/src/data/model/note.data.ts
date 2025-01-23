import { Document } from 'mongoose';

export enum NoteType {
  A = 'A',
  B = 'B',
  C = 'C',
}

export class NoteData {
  title?: string;
  body?: string;
  createdAt?: string;
  archived?: boolean;
  noteType?: NoteType;

  constructor(init?: Partial<NoteData>) {
    Object.assign(this, init);
  }

  static fromDocument(doc: Document): NoteData {
    return new NoteData({
      title: doc.get('title'),
      body: doc.get('body'),
      createdAt: doc.get('createdAt'),
      archived: doc.get('archived'),
      noteType: doc.get('noteType'),
    });
  }
}