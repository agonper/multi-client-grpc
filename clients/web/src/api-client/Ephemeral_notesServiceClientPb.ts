/**
 * @fileoverview gRPC-Web generated client stub for api
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';
import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';

import {
  Note,
  StreamNotesResponse} from './ephemeral_notes_pb';

export class EphemeralNotesClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: string; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoPublishNote = new grpcWeb.AbstractClientBase.MethodInfo(
    Note,
    (request: Note) => {
      return request.serializeBinary();
    },
    Note.deserializeBinary
  );

  publishNote(
    request: Note,
    metadata: grpcWeb.Metadata | null): Promise<Note>;

  publishNote(
    request: Note,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Note) => void): grpcWeb.ClientReadableStream<Note>;

  publishNote(
    request: Note,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: Note) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/api.EphemeralNotes/PublishNote',
        request,
        metadata || {},
        this.methodInfoPublishNote,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/api.EphemeralNotes/PublishNote',
    request,
    metadata || {},
    this.methodInfoPublishNote);
  }

  methodInfoStreamNotes = new grpcWeb.AbstractClientBase.MethodInfo(
    StreamNotesResponse,
    (request: google_protobuf_empty_pb.Empty) => {
      return request.serializeBinary();
    },
    StreamNotesResponse.deserializeBinary
  );

  streamNotes(
    request: google_protobuf_empty_pb.Empty,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/api.EphemeralNotes/StreamNotes',
      request,
      metadata || {},
      this.methodInfoStreamNotes);
  }

}

