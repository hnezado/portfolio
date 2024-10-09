<template>
  <div id="projects" ref="scrollWatcher">
    <div
      v-if="popupProjIndex !== null || carouselProjIndex !== null"
      class="overlay"
    ></div>
    <div v-if="popupProjIndex !== null" class="popup-container">
      <div class="popup-bg" @click="closePopup"></div>
      <div class="popup">
        <h4>Use Instructions</h4>
        <ol class="popup-text">
          <li>
            Click to
            <a
              v-if="appDownloadUrlIsString"
              :href="appDownloadUrl"
              class="link popup-link-download"
              download
              >Download</a
            >
            <a v-else><del>Download</del></a>
            to get the <b>{{ currentProjectPopup.name }}.zip</b> file
          </li>
          <li>Extract all the content into a folder on your computer</li>
          <li>
            Run the <b>{{ currentProjectPopup.name }}.exe</b> file
          </li>
          <li>Don't forget to check out the README</li>
        </ol>
        <button @click="closePopup" class="button popup-btn-close">
          Close
        </button>
      </div>
    </div>
    <a
      href="#"
      class="btn-index"
      :class="{ 'btn-index-show': isIndexBtnShown }"
    >
      ▲ Back To Index ▲
    </a>
    <div v-if="carouselProjIndex !== null" class="carousel-container-proj">
      <div @click="closeCarousel" class="carousel-bg"></div>
      <div class="carousel carousel-proj">
        <img
          :src="
            projects[carouselProjIndex].screenshotsPaths[
              carouselScreenshotIndex
            ]
          "
          :alt="`img_${carouselScreenshotIndex}`"
          class="carousel-img"
        />
        <span
          @click="closeCarousel"
          class="carousel-btn carousel-btn-enabled carousel-btn-proj carousel-close"
          >✕</span
        >
        <span
          @click="prevImg"
          class="carousel-btn carousel-btn-proj carousel-prev"
          :class="{ 'carousel-btn-enabled': carouselScreenshotIndex !== 0 }"
          >&lt;</span
        >
        <span
          @click="nextImg"
          class="carousel-btn carousel-btn-proj carousel-next"
          :class="{
            'carousel-btn-enabled':
              carouselScreenshotIndex <
              currentProjectCarousel.screenshotsPaths.length - 1,
          }"
          >&gt;</span
        >
      </div>
    </div>
    <div class="projs-index">
      <div class="projs-title">
        <img
          :src="require('@/assets/projects_header.png')"
          alt="projects_header"
        />
        <h1>My Projects</h1>
      </div>
      <ul class="projs-list">
        <li v-for="(proj, index) in projects" :key="index">
          <a
            :href="'#' + proj.name"
            :class="{
              'link proj-card': true,
              'proj-wip': isWorkInProgress(proj),
            }"
          >
            <img
              v-if="proj.iconPath"
              :src="`${proj.iconPath}`"
              :alt="`${proj.name}_icon`"
              class="proj-icon"
            />
            {{ proj.fullName }}
            <div v-if="isWorkInProgress(proj)" class="overlay-wip"></div>
            <div v-if="isWorkInProgress(proj)" class="wip-message">
              Currently under construction
            </div>
          </a>
        </li>
      </ul>
    </div>
    <section
      v-for="(proj, projIndex) in projects"
      :key="projIndex"
      class="proj-section"
      :id="proj.name"
    >
      <h2>{{ proj.fullName }}</h2>
      <img
        v-if="isWorkInProgress(proj)"
        :src="require('@/assets/wip.png')"
        alt="Work In Progress"
        class="proj-wip-image"
      />
      <div class="techs">
        <h6>Development tools and technologies:</h6>
        <div class="proj-techs">
          <span
            v-for="tech in proj.technologies"
            :key="tech"
            class="proj-tech"
            >{{ tech }}</span
          >
        </div>
      </div>
      <span v-html="proj.description" class="proj-description"></span>
      <div class="proj-btns">
        <a
          v-if="proj.downloadable"
          @click="openPopup(projIndex)"
          class="button"
        >
          Download
        </a>
        <a v-else :href="proj.url" target="_blank" class="button">Go to App</a>
      </div>
      <a :href="proj.github" target="_blank" class="link check-github"
        ><b>Check it on GitHub ↗</b>
      </a>
      <div class="proj-img-container">
        <img
          v-for="(screenshotPath, screenshotIndex) of proj.screenshotsPaths"
          :key="screenshotIndex"
          :src="screenshotPath"
          :alt="`img_${screenshotIndex + 1}`"
          @click="openCarousel(projIndex, screenshotIndex)"
          class="proj-img"
        />
      </div>
      <div><br /></div>
    </section>
  </div>
</template>

<script>
import mixin from "@/mixin.js";
import "@/styles/Projects.css";

export default {
  name: "ProjectsComponent",
  data() {
    return {
      pathsConfig: null,
      projects: [],
      projectsIcons: [],
      isIndexBtnShown: false,
      popupProjIndex: null,
      appDownloadUrl: null,
      carouselProjIndex: null,
      carouselScreenshotIndex: null,
    };
  },
  mixins: [mixin],
  async mounted() {
    window.addEventListener("scroll", this.checkScrollPos);
    this.updateRoute(this.$route.path);
    await this.fetchPathsConfig();
    await this.fetchProjects();
    await this.generateProjectsImagesPaths();
    await this.checkDownloadable();
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.checkScrollPos);
  },
  computed: {
    currentProjectPopup() {
      if (this.popupProjIndex !== null) {
        return this.projects[this.popupProjIndex];
      }
      return null;
    },
    appDownloadUrlIsString() {
      return typeof this.appDownloadUrl === "string";
    },
    currentProjectCarousel() {
      if (this.carouselProjIndex !== null) {
        return this.projects[this.carouselProjIndex];
      }
      return null;
    },
  },
  methods: {
    async fetchPathsConfig() {
      try {
        const apiUrl = `${process.env.VUE_APP_API_URL}/config/paths`;
        const response = await fetch(apiUrl);
        this.pathsConfig = await response.json();
      } catch (error) {
        const msg = "Error fetching paths config";
        console.error(msg, error);
      }
    },
    async fetchProjects() {
      try {
        const apiUrl = `${process.env.VUE_APP_API_URL}/config/projects`;
        const response = await fetch(apiUrl);
        this.projects = await response.json();
      } catch (error) {
        const msg = "Error fetching paths config";
        console.error(msg, error);
      }
    },
    async generateProjectsImagesPaths() {
      this.projects = await Promise.all(
        this.projects.map(async (proj) => {
          const editedProject = proj;
          const projectImages = await this.retrieveProjectImages(proj.name);
          const { defaultScreenshotName, imageFormat } =
            this.pathsConfig.projects;
          const regex = new RegExp(
            `.*${defaultScreenshotName}\\d+${imageFormat}$`,
            "i"
          );

          editedProject["iconPath"] = `${
            this.pathsConfig.baseURL
          }${projectImages.objects.filter((obj) => obj.includes("/icon."))}`;

          editedProject["screenshotsPaths"] = projectImages.objects
            .filter((obj) => regex.test(obj))
            .map((obj) => `${this.pathsConfig.baseURL}${obj}`)
            .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

          return editedProject;
        })
      );
    },
    async retrieveProjectImages(projectName) {
      try {
        const apiUrl = `${process.env.VUE_APP_API_URL}/retrieve-project-images`;
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ projectName }),
        });

        if (!response.ok) {
          throw new Error("Error retrieving project images");
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error:", error.message);
      }
    },
    async checkDownloadable() {
      this.projects.forEach((proj) => {
        proj.downloadable = !proj.url.length;
      });
    },
    isWorkInProgress(proj) {
      return (
        (proj.description && !proj.description.length) ||
        !proj.screenshotsPaths ||
        (proj.screenshotsPaths && !proj.screenshotsPaths.length)
      );
    },
    checkScrollPos() {
      this.isIndexBtnShown = window.scrollY !== 0;
    },
    async getAppUrl() {
      try {
        const res = await fetch(`${process.env.VUE_APP_API_URL}/download`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileName: `${this.currentProjectPopup.name}`,
          }),
        });
        const data = await res.json();
        this.appDownloadUrl = data.downloadUrl;
      } catch (error) {
        console.error("Error fetching app URL:", error);
      }
    },
    openPopup(popupProjIndex) {
      this.popupProjIndex = popupProjIndex;
      this.getAppUrl();
    },
    closePopup() {
      this.popupProjIndex = null;
      this.appDownloadUrl = null;
    },
    openCarousel(carouselProjIndex, carouselScreenshotIndex) {
      this.carouselProjIndex = carouselProjIndex;
      this.carouselScreenshotIndex = carouselScreenshotIndex;
    },
    closeCarousel() {
      this.carouselProjIndex = null;
      this.carouselScreenshotIndex = null;
    },
    prevImg() {
      const minIndex = 0;
      this.carouselScreenshotIndex--;
      if (this.carouselScreenshotIndex < minIndex) {
        this.carouselScreenshotIndex = minIndex;
      }
    },
    nextImg() {
      const maxIndex =
        this.projects[this.carouselProjIndex].screenshotsPaths.length - 1;
      this.carouselScreenshotIndex++;
      if (this.carouselScreenshotIndex > maxIndex) {
        this.carouselScreenshotIndex = maxIndex;
      }
    },
  },
};
</script>
