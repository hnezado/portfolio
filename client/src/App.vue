<template>
  <Navbar :currentRoute="currentRoute" />
  <Background />
  <div class="main-container"><router-view @updateRoute="updateRoute" /></div>
  <Footer />
</template>

<script>
import "@/styles/main.css";
import Navbar from "./components/Navbar.vue";
import Background from "./components/Background.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Background,
    Footer,
  },
  data() {
    return {
      currentRoute: "",
    };
  },
  methods: {
    updateRoute(value) {
      this.currentRoute = value;
    },
  },
};
</script>
