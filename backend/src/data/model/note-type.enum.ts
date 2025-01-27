export enum NoteTypeEnum {
  A = 'A',
  B = 'B',
  C = 'C',
}

export namespace NoteTypeEnum {
  export function mapNoteType(type: string): NoteTypeEnum | undefined {
    return Object.values(NoteTypeEnum).includes(type as NoteTypeEnum)
      ? (type as NoteTypeEnum)
      : undefined;
  }
}