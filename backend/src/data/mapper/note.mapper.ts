import {NoteModel} from "../../domain/model/note.model";
import {NoteData} from "../model/note.data";

export const noteMapper = {
    mapFromData(noteData: NoteData): NoteModel {
        return {
            id: noteData.id,
            title: noteData.title,
            body: noteData.body,
            createdAt: noteData.createdAt,
            archived: noteData.archived,
        };
    },
    mapFromDomain(note: NoteModel): NoteData {
        return {
            id: note.id,
            title: note.title,
            body: note.body,
            createdAt: note.createdAt,
            archived: note.archived,
        };
    },
};