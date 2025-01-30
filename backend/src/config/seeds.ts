import {MongoDatabase} from "../data/database/mongo.database";

export class Seeds {
  static async initData(appDb: MongoDatabase) {
    await appDb.noteDao().insertMany([
      {
        "title": "First Note",
        "body": "This is the body of the first note",
        "createdAt": "2025-01-01T10:00:00Z",
        "archived": false,
        "noteType": "A"
      },
      {
        "title": "Second Note",
        "body": "Details about the second note",
        "createdAt": "2025-01-02T12:30:00Z",
        "archived": true,
        "noteType": "B"
      },
      {
        "title": "Third Note",
        "body": "An important note with type C",
        "createdAt": "2025-01-03T09:15:00Z",
        "archived": false,
        "noteType": "C"
      },
      {
        "title": "Fourth Note",
        "body": "Archived note example",
        "createdAt": "2025-01-04T14:45:00Z",
        "archived": true,
        "noteType": "A"
      },
      {
        "title": "Fifth Note",
        "body": "Quick note of type B",
        "createdAt": "2025-01-05T08:20:00Z",
        "archived": false,
        "noteType": "B"
      },
      {
        "title": "Sixth Note",
        "body": "Another archived note",
        "createdAt": "2025-01-06T11:10:00Z",
        "archived": true,
        "noteType": "C"
      },
      {
        "title": "Seventh Note",
        "body": "Example note with noteType A",
        "createdAt": "2025-01-07T13:50:00Z",
        "archived": false,
        "noteType": "A"
      },
      {
        "title": "Eighth Note",
        "body": "Note of type B with details",
        "createdAt": "2025-01-08T07:40:00Z",
        "archived": false,
        "noteType": "B"
      },
      {
        "title": "Ninth Note",
        "body": "This note has been archived",
        "createdAt": "2025-01-09T15:25:00Z",
        "archived": true,
        "noteType": "C"
      },
      {
        "title": "Tenth Note",
        "body": "Last note example with type A",
        "createdAt": "2025-01-10T10:05:00Z",
        "archived": false,
        "noteType": "A"
      }
    ]).catch((err) => {
      console.log(err);
    });
  }
}