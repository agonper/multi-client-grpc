/* eslint-disable */
// package: api
// file: ephemeral_notes.proto

var ephemeral_notes_pb = require("./ephemeral_notes_pb");
var google_protobuf_empty_pb = require("google-protobuf/google/protobuf/empty_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var EphemeralNotes = (function() {
  function EphemeralNotes() {}
  EphemeralNotes.serviceName = "api.EphemeralNotes";
  return EphemeralNotes;
})();

EphemeralNotes.PublishNote = {
  methodName: "PublishNote",
  service: EphemeralNotes,
  requestStream: false,
  responseStream: false,
  requestType: ephemeral_notes_pb.Note,
  responseType: ephemeral_notes_pb.Note,
};

EphemeralNotes.StreamNotes = {
  methodName: "StreamNotes",
  service: EphemeralNotes,
  requestStream: false,
  responseStream: true,
  requestType: google_protobuf_empty_pb.Empty,
  responseType: ephemeral_notes_pb.StreamNotesResponse,
};

exports.EphemeralNotes = EphemeralNotes;

function EphemeralNotesClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

EphemeralNotesClient.prototype.publishNote = function publishNote(
  requestMessage,
  metadata,
  callback
) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(EphemeralNotes.PublishNote, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function(response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    },
  });
  return {
    cancel: function() {
      callback = null;
      client.close();
    },
  };
};

EphemeralNotesClient.prototype.streamNotes = function streamNotes(
  requestMessage,
  metadata
) {
  var listeners = {
    data: [],
    end: [],
    status: [],
  };
  var client = grpc.invoke(EphemeralNotes.StreamNotes, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function(responseMessage) {
      listeners.data.forEach(function(handler) {
        handler(responseMessage);
      });
    },
    onEnd: function(status, statusMessage, trailers) {
      listeners.status.forEach(function(handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function(handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    },
  });
  return {
    on: function(type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function() {
      listeners = null;
      client.close();
    },
  };
};

exports.EphemeralNotesClient = EphemeralNotesClient;
