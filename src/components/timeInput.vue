<template>
  <v-row justify="center">
    <v-btn color="primary" dark @click.stop="dialog = true">Open Dialog</v-btn>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">{{ title }}</v-card-title>
        <v-time-picker scrollable format="24hr" class="elevation-4">
          <v-spacer></v-spacer>
          <v-btn text color="secondary" @click="console.log('press')">Aktuelle Uhrzeit</v-btn>
          <v-spacer></v-spacer>
        </v-time-picker>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      title: "Beginn",
      dialog: false
    };
  }
};
</script>