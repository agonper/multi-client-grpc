// package: api
// file: ephemeral_notes.proto

import * as ephemeral_notes_pb from "./ephemeral_notes_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import { grpc } from "@improbable-eng/grpc-web";

type EphemeralNotesPublishNote = {
  readonly methodName: string;
  readonly service: typeof EphemeralNotes;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof ephemeral_notes_pb.Note;
  readonly responseType: typeof ephemeral_notes_pb.Note;
};

type EphemeralNotesStreamNotes = {
  readonly methodName: string;
  readonly service: typeof EphemeralNotes;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof ephemeral_notes_pb.StreamNotesResponse;
};

export class EphemeralNotes {
  static readonly serviceName: string;
  static readonly PublishNote: EphemeralNotesPublishNote;
  static readonly StreamNotes: EphemeralNotesStreamNotes;
}

export type ServiceError = {
  message: string;
  code: number;
  metadata: grpc.Metadata;
};
export type Status = { details: string; code: number; metadata: grpc.Metadata };

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: "data", handler: (message: T) => void): ResponseStream<T>;
  on(type: "end", handler: (status?: Status) => void): ResponseStream<T>;
  on(type: "status", handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: "end", handler: (status?: Status) => void): RequestStream<T>;
  on(type: "status", handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(
    type: "data",
    handler: (message: ResT) => void
  ): BidirectionalStream<ReqT, ResT>;
  on(
    type: "end",
    handler: (status?: Status) => void
  ): BidirectionalStream<ReqT, ResT>;
  on(
    type: "status",
    handler: (status: Status) => void
  ): BidirectionalStream<ReqT, ResT>;
}

export class EphemeralNotesClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  publishNote(
    requestMessage: ephemeral_notes_pb.Note,
    metadata: grpc.Metadata,
    callback: (
      error: ServiceError | null,
      responseMessage: ephemeral_notes_pb.Note | null
    ) => void
  ): UnaryResponse;
  publishNote(
    requestMessage: ephemeral_notes_pb.Note,
    callback: (
      error: ServiceError | null,
      responseMessage: ephemeral_notes_pb.Note | null
    ) => void
  ): UnaryResponse;
  streamNotes(
    requestMessage: google_protobuf_empty_pb.Empty,
    metadata?: grpc.Metadata
  ): ResponseStream<ephemeral_notes_pb.StreamNotesResponse>;
}
