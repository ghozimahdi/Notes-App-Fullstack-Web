import {NoteModel} from "../../domain/model/note.model";
import {NoteData} from "../model/note.data";
import {UpdateNoteInput} from "../../domain/model/update-note.input";

export const noteMapper = {
  mapFromData(noteData: NoteData | null): NoteModel {
    return {
      id: noteData?.id ?? 0,
      title: noteData?.title ?? '',
      body: noteData?.body ?? '',
      createdAt: noteData?.createdAt ?? '',
      archived: noteData?.archived ?? false,
    };
  },
  mapFromDomain(input: UpdateNoteInput): NoteData {
    return {
      id: input.id,
      title: input.title,
      body: input.body,
      archived: input.archived,
    };
  },
};