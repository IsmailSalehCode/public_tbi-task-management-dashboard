<template>
  <v-app>
    <AppBar />
    <v-main>
      <router-view v-slot="{ Component }">
        <transition name="page-opacity" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  components: {
    AppBar,
    AppFooter,
  },
  mounted() {
    window.addEventListener("keydown", this.navigateRouterHistory);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.navigateRouterHistory);
  },
  methods: {
    navigateRouterHistory(event) {
      if (event.key === "ArrowLeft") {
        // console.log("back");
        this.$router.go(-1);
      } else if (event.key === "ArrowRight") {
        // console.log("forward");
        this.$router.go(1);
      }
    },
  },
};
</script>

<style>
.page-opacity-enter-active,
.page-opacity-leave-active {
  transition: 450ms ease all;
}

.page-opacity-enter-from,
.page-opacity-leave-to {
  opacity: 0;
}

.v-card-actions {
  flex-wrap: wrap;
}
.v-toolbar {
  background-color: lightgray;
}
html {
  overflow-y: auto;
  scroll-behavior: smooth;
}
.v-application {
  font-family: sans-serif, Times;
}
body {
  margin: 0;
  padding: 0;
}
p {
  text-indent: 10px;
  font-weight: 200;
  text-align: justify;
}
/* width */
::-webkit-scrollbar {
  width: 4px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #004e92;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #309fff;
}
.customLink {
  text-decoration: none;
  color: #2188c3;
  transition: all 0.3s;
}
.customLink:hover {
  color: #1dade7;
}
</style>
