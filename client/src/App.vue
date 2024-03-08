<template>
  <Navbar />
  <Background />
  <div class="main-container"><router-view /></div>
  <Footer />
</template>

<script>
import "@/styles.css";
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
};
</script>
