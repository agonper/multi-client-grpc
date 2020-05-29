<template>
  <p>This is just a test</p>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { EphemeralNotesClient } from "../api-client/Ephemeral_notesServiceClientPb";
import { Note } from "../api-client/ephemeral_notes_pb";
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";

@Component
export default class HelloWorld extends Vue {
  constructor() {
    super();
    const client = new EphemeralNotesClient(
      "https://api-gateway-3t5ec74iwa-ew.a.run.app"
    );

    const note = new Note();
    note.setMessage("Hello from a web client!");

    const createdAt = new Timestamp();
    createdAt.fromDate(new Date());
    note.setCreatedAt(createdAt);

    client
      .publishNote(note, {})
      .then(publishedNote => console.log(`Published: ${publishedNote}`));
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
