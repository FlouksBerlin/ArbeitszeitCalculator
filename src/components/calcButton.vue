<template>
  <div>
    <v-row>
      <v-item-group class="ma-4">
        <v-btn color="red" tile icon style="border-radius:4px" @click="decrementOverhour">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
        <v-btn outlined color="primary" min-width="200" @click="calculate">
          {{calculation}}
          <span
            class="ml-1"
            v-if="overhour !== 0"
          >[{{overhour>0 ? '+'+overhour : overhour }}]</span>
        </v-btn>
        <v-btn color="green" tile icon style="border-radius:4px" @click="incrementOverhour">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-item-group>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    overhour: 0,
    calculation: "Soll",
    alert: false,
    tempClockCheck: null
  }),
  methods: {
    calculate() {
      if (!this.tempClockCheck) {
        this.$emit("mytest", false);
      }
    },
    incrementOverhour() {
      if (this.overhour < 5) {
        this.overhour += 1;
        this.calculationCheck();
      }
    },
    decrementOverhour() {
      if (this.overhour > -5) {
        this.overhour -= 1;
        this.calculationCheck();
      }
    },
    calculationCheck() {
      if (this.overhour < 0) {
        this.calculation = "Minusstunden";
      } else if (this.overhour > 0) {
        this.calculation = "Überstunden";
      } else {
        this.calculation = "Soll";
      }
    }
  }
};
</script>
