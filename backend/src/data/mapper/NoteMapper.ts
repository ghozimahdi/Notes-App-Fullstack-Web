import {Note} from "../../domain/model/Note";
import {NoteData} from "../model/NoteData";

export const NoteMapper = {
    mapFromData(noteData: NoteData): Note {
        return {
            id: noteData.id,
            title: noteData.title,
            body: noteData.body,
            createdAt: noteData.createdAt,
            archived: noteData.archived,
        };
    },
    mapFromDomain(note: Note): NoteData {
        return {
            id: note.id,
            title: note.title,
            body: note.body,
            createdAt: note.createdAt,
            archived: note.archived,
        };
    },
};