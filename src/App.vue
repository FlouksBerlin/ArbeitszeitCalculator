<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid>
        <h1 class="text-center display-3 flex" align="center">Arbeitszeit-Calculator</h1>
        <v-row align="center" justify="center">
          <!-- <v-col cols="12">
            <v-row align="center" justify="center">
               <calcButton @mytest="raiseAlert($event)"></calcButton>
            </v-row>
            <v-row align="center">
              <v-col md="6" offset-md="3">
                <v-alert
                  :value="alert"
                  type="error"
                  text
                  dismissible
                  border="left"
                  icon="mdi-home"
                  transition="scale-transition"
                >Eine Uhrzeit für den Arbeitsbeginn muss eingestellt werden.</v-alert>
              </v-col>
            </v-row>
          </v-col>-->
          <v-col cols="12" md="10" lg="8">
            <v-row justify="space-around" align="center">
              <div>
                <h2>Beginn:</h2>
                <v-time-picker v-model="arrivalTime" scrollable format="24hr" class="elevation-4">
                  <v-spacer></v-spacer>
                  <v-btn text color="secondary" @click="arrivalTime = currentTime()">Aktuelle Uhrzeit</v-btn>
                  <v-spacer></v-spacer>
                </v-time-picker>
              </div>
              <div>
                <h2>Ende:</h2>
                <v-time-picker v-model="leavingTime" scrollable actions format="24hr" class="elevation-4">
                  <v-spacer></v-spacer>
                  <v-btn text color="secondary" @click="leavingTime = currentTime()">Aktuelle Uhrzeit</v-btn>
                  <v-spacer></v-spacer>
                </v-time-picker>
              </div>
            </v-row>
          </v-col>
          <v-col cols="12" md="9" lg="7" v-if="timeEntry">
            <v-card elevation="4">
              <v-toolbar color="primary" dark flat dense>
                <v-icon medium class="mr-3" color="grey lighten-5">mdi-calendar</v-icon>
                <v-toolbar-title class="text-center">
                  {{ new Date().toLocaleDateString("de-DE") }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-radio-group v-model="workhours" row hide-details>
                  <v-radio label="35h/Week" value="7" color="secondary"></v-radio>
                  <v-radio label="40h/Week" value="8" color="secondary"></v-radio>
                </v-radio-group>
              </v-toolbar>
              <v-col cols="12" sm="10" offset-sm="1">
                <v-simple-table class="myt">
                  <thead>
                    <tr>
                      <th>Arbeitszeit (Brutto)</th>
                      <th>Arbeitszeit (netto)</th>
                      <th>Sollarbeitszeit</th>
                      <th>Gleitzeit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{ grossWorkTime(timeEntry) | decimalTime }}</td>
                      <td>{{ netWorkTime(timeEntry) | decimalTime }}</td>
                      <td>{{ timeEntry.targetTime | decimalTime }}</td>
                      <td>
                        <v-icon small class="mr-2" :color="overtime(timeEntry) < 0 ? 'red' : 'green'">
                          {{ overtime(timeEntry) < 0 ? "trending_down" : "trending_up" }}
                        </v-icon>
                        {{ overtime(timeEntry) | decimalTime }}
                      </td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-col>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import calcButton from "@/components/calcButton";
import { worktimeMixin } from "@/mixins/worktime";

export default {
  mixins: [worktimeMixin],
  components: {
    calcButton,
  },
  data: () => ({
    overhour: -3,
    workhours: "8",
    start: null,
    end: null,
    alert: false,
    arrivalTime: null,
    leavingTime: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }),
  methods: {
    raiseAlert(bolAlert) {
      alert("parent" + bolAlert);
      this.alert = bolAlert;
    },
    currentTime() {
      return new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
  computed: {
    timeEntry() {
      if (this.arrivalTime && this.leavingTime) {
        return {
          arrivalTime: this.timeStringToDecimal(this.arrivalTime),
          leavingTime: this.timeStringToDecimal(this.leavingTime),
          targetTime: this.workhours,
        };
      }
    },
  },
  watch: {
    arrivalTime: {
      handler() {
        localStorage.setItem("cacheDate", new Date().toDateString());
        localStorage.setItem("arrivalTime", this.arrivalTime);
      },
    },
  },
  mounted() {
    var currentDateStr = new Date().toDateString();
    if (localStorage.getItem("cacheDate") === currentDateStr) {
      this.arrivalTime = localStorage.getItem("arrivalTime");
    } else {
      localStorage.clear();
    }
  },
};
</script>

<style>
.myt th,
.myt td {
  font-size: 1.1rem;
}
.myt td {
  width: 25%;
}
</style>
