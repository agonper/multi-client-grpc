/* eslint-disable */
import * as jspb from "google-protobuf";

import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class Note extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): Note;

  getCreatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreatedAt(value?: google_protobuf_timestamp_pb.Timestamp): Note;
  hasCreatedAt(): boolean;
  clearCreatedAt(): Note;

  getPublishedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setPublishedAt(value?: google_protobuf_timestamp_pb.Timestamp): Note;
  hasPublishedAt(): boolean;
  clearPublishedAt(): Note;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Note.AsObject;
  static toObject(includeInstance: boolean, msg: Note): Note.AsObject;
  static serializeBinaryToWriter(
    message: Note,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): Note;
  static deserializeBinaryFromReader(
    message: Note,
    reader: jspb.BinaryReader
  ): Note;
}

export namespace Note {
  export type AsObject = {
    message: string;
    createdAt?: google_protobuf_timestamp_pb.Timestamp.AsObject;
    publishedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject;
  };
}

export class StreamNotesResponse extends jspb.Message {
  getNotesList(): Array<Note>;
  setNotesList(value: Array<Note>): StreamNotesResponse;
  clearNotesList(): StreamNotesResponse;
  addNotes(value?: Note, index?: number): Note;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StreamNotesResponse.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: StreamNotesResponse
  ): StreamNotesResponse.AsObject;
  static serializeBinaryToWriter(
    message: StreamNotesResponse,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): StreamNotesResponse;
  static deserializeBinaryFromReader(
    message: StreamNotesResponse,
    reader: jspb.BinaryReader
  ): StreamNotesResponse;
}

export namespace StreamNotesResponse {
  export type AsObject = {
    notesList: Array<Note.AsObject>;
  };
}
