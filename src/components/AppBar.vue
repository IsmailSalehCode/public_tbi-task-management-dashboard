<template>
  <v-app-bar id="appBar" density="compact">
    <v-app-bar-title>
      <v-btn icon @click="routeToHome">
        <v-icon :icon="topIcon"></v-icon>
      </v-btn>
    </v-app-bar-title>
  </v-app-bar>
</template>

<script>
import { mdiTableLarge } from "@mdi/js";
export default {
  data() {
    return {
      topIcon: mdiTableLarge,
    };
  },
  methods: {
    routeToHome() {
      this.$router.push("/");
    },
  },
};
</script>
