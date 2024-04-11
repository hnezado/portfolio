import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import config from "./config_dev.json";

import HallPage from "./components/Hall.vue";
import ProjectsPage from "./components/Projects.vue";
import ContactPage from "./components/Contact.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HallPage },
    { path: "/projects", component: ProjectsPage },
    { path: "/contact", component: ContactPage },
  ],
});

const app = createApp(App);
app.config.globalProperties.$config = config;
app.use(router).mount("#app");
