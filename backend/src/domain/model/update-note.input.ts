export interface UpdateNoteInput {
  id: string;
  title: string;
  body: string;
  archived: boolean;
  noteType: string;
}