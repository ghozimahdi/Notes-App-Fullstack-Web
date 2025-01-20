import {NoteData} from "../model/note.data";
import {injectable} from "inversify";
import {BadRequestException, NotFoundException} from "../../domain/model/exception";

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
    return this.notes;
  }

  getNoteById(id: number): NoteData | undefined {
    return this.notes.find((note) => note.id === id);
  }

  createNote(newNote: Omit<NoteData, 'id'>): NoteData {
    const newId = this.notes.length + 1;
    const createdNote = {id: newId, ...newNote};
    this.notes.push(createdNote);
    return createdNote;
  }

  async updateNote(noteData: NoteData): Promise<NoteData> {
    const noteIndex = this.notes.findIndex((note) => note.id === noteData.id);
    if (noteIndex === -1) {
      console.log('test')
      throw new NotFoundException(`Note with id: ${noteData.id} not found`);
    }

    const newNote = {
      ...noteData,
      createdAt: new Date().toISOString(),
    }

    const updated = {...this.notes[noteIndex], ...newNote};
    this.notes[noteIndex] = updated;
    return updated;
  }

  deleteNote(id: number): boolean {
    const noteIndex = this.notes.findIndex((note) => note.id === id);
    if (noteIndex === -1) return false;

    this.notes.splice(noteIndex, 1);
    return true;
  }
}

export default NoteDatasource;