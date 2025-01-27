enum NoteTypeEnum {
  A = 'A',
  B = 'B',
  C = 'C',
}

const NoteTypeMapper = {
  mapNoteType: (type: string): NoteTypeEnum | undefined => {
    return Object.values(NoteTypeEnum).includes(type as NoteTypeEnum)
      ? (type as NoteTypeEnum)
      : undefined;
  },
};

export {NoteTypeEnum, NoteTypeMapper}