import {NoteModel} from "../../domain/model/note.model";
import {NoteData} from "../model/note.data";
import {UpdateNoteInput} from "../../domain/model/update-note.input";
import {NoteTypeEnum} from "../model/note-type.enum";

export const noteMapper = {
  mapFromData(noteData: NoteData | null): NoteModel {
    return {
      userId: noteData?.userId ?? '',
      id: noteData?._id ?? '',
      title: noteData?.title ?? '',
      body: noteData?.body ?? '',
      createdAt: noteData?.createdAt ?? '',
      archived: noteData?.archived ?? false,
      noteType: noteData?.noteType ?? ''
    };
  },
  mapFromDomain(input: UpdateNoteInput): Partial<NoteData> {
    return {
      _id: input.id,
      title: input.title,
      body: input.body,
      archived: input.archived,
      noteType: NoteTypeEnum.mapNoteType(input.noteType),
    };
  },
};