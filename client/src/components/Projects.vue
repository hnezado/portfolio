<template>
  <div id="projects">
    <h1>My Projects</h1>
    <ul class="projects-list">
      <li v-for="(proj, index) in projects" :key="index">
        <a :href="proj.url" target="_blank" class="link">{{ proj.fullName }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ProjectsComponent",
  data() {
    return {
      projects: [],
    };
  },
  mounted() {
    this.fetchProjects();
  },
  methods: {
    async fetchProjects() {
      try {
        const res = await fetch(`${this.$config.serverUrl}/projects`);
        const data = await res.json();
        if (Array.isArray(data)) {
          if (data.length > 0) {
            this.projects = data;
          }
        }
        console.log("projects:", this.projects);
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    },
  },
};
</script>
