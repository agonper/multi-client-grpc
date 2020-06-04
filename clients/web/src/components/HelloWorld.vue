<template>
  <div v-if="publishedMessage">{{ publishedMessage }}</div>
  <div v-else>Publishing message...</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { grpc } from "@improbable-eng/grpc-web";
import { Note } from "../api-client/ephemeral_notes_pb";
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";
import { EphemeralNotes } from "../api-client/ephemeral_notes_pb_service";

@Component
export default class HelloWorld extends Vue {
  publishedMessage = "";

  mounted() {
    const note = new Note();
    note.setMessage("Hello from a web client!");

    const createdAt = new Timestamp();
    createdAt.fromDate(new Date());
    note.setCreatedAt(createdAt);

    grpc.unary(EphemeralNotes.PublishNote, {
      request: note,
      host: "https://api-gateway-3t5ec74iwa-ew.a.run.app",
      onEnd: (res) => {
        const { status, statusMessage, headers, message, trailers } = res;
        console.log("publishNote.onEnd.status", status, statusMessage);
        console.log("publishNote.onEnd.headers", headers);
        if (
          (status === grpc.Code.OK || status === grpc.Code.Unknown) &&
          message
        ) {
          const note = message as Note;
          const betterMessage = {
            message: note.getMessage(),
            createdAt: note.getCreatedAt().toDate(),
            publishedAt: note.getPublishedAt().toDate(),
          };
          console.log("publishNote.onEnd.message", betterMessage);
          this.publishedMessage = JSON.stringify(betterMessage);
        }
        console.log("publishNote.onEnd.trailers", trailers);
      },
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
