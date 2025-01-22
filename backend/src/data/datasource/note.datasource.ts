import {NoteData} from "../model/note.data";
import {injectable} from "inversify";

@injectable()
class NoteDatasource {
  private notes: NoteData[] = [
    {
      id: 1,
      title: "Babel",
      body: "Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.",
      createdAt: '2022-04-14T04:27:34.572Z',
      archived: false,
    },
    {
      id: 2,
      title: "Functional Component",
      body: "Functional component merupakan React component yang dibuat menggunakan fungsi JavaScript. Agar fungsi JavaScript dapat disebut component ia harus mengembalikan React element dan dipanggil layaknya React component.",
      createdAt: '2022-04-14T04:27:34.572Z',
      archived: false,
    },
    {
      id: 3,
      title: "Modularization",
      body: "Dalam konteks pemrograman JavaScript, modularization merupakan teknik dalam memecah atau menggunakan kode dalam berkas JavaScript secara terpisah berdasarkan tanggung jawabnya masing-masing.",
      createdAt: '2022-04-14T04:27:34.572Z',
      archived: false,
    },
    {
      id: 4,
      title: "Lifecycle",
      body: "Dalam konteks React component, lifecycle merupakan kumpulan method yang menjadi siklus hidup mulai dari component dibuat (constructor), dicetak (render), pasca-cetak (componentDidMount), dan sebagainya. ",
      createdAt: '2022-04-14T04:27:34.572Z',
      archived: false,
    },
    {
      id: 5,
      title: "ESM",
      body: "ESM (ECMAScript Module) merupakan format modularisasi standar JavaScript.",
      createdAt: '2022-04-14T04:27:34.572Z',
      archived: false,
    },
    {
      id: 6,
      title: "Module Bundler",
      body: "Dalam konteks pemrograman JavaScript, module bundler merupakan tools yang digunakan untuk menggabungkan seluruh modul JavaScript yang digunakan oleh aplikasi menjadi satu berkas.",
      createdAt: '2022-04-14T04:27:34.572Z',
      archived: false,
    },
  ];

  async getAllNotes(): Promise<NoteData[]> {
    try {
      return this.notes;
    } catch (e) {
      throw e;
    }
  }

  getNoteById(id: number): NoteData | null {
    try {
      const note = this.notes.find((note) => note.id === id);
      if (!note) {
        return null;
      }

      return note;
    } catch (e) {
      throw e;
    }
  }

  createNote(newNote: Omit<NoteData, 'id'>): NoteData {
    try {
      const newId = this.notes.length + 1;
      const createdNote = {id: newId, ...newNote};
      this.notes.push(createdNote);
      return createdNote;
    } catch (e) {
      throw e;
    }
  }

  async updateNote(noteData: NoteData): Promise<NoteData | null> {
    try {
      const noteIndex = this.notes.findIndex((note) => note.id === noteData.id);
      if (noteIndex === -1) {
        return null;
      }

      const newNote = {
        ...noteData,
        createdAt: new Date().toISOString(),
      }

      const updated = {...this.notes[noteIndex], ...newNote};
      this.notes[noteIndex] = updated;
      return updated;
    } catch (e) {
      throw e;
    }
  }

  deleteNote(id: number): boolean {
    try {
      const noteIndex = this.notes.findIndex((note) => note.id === id);
      if (noteIndex === -1) {
        return false;
      }

      this.notes.splice(noteIndex, 1);
      return true;
    } catch (e) {
      throw e;
    }
  }
}

export default NoteDatasource;