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
              v-if="projDownloadUrlIsString"
              :href="projDownloadUrl"
              class="link popup-link-download"
              target="_blank"
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
          :src="projects[carouselProjIndex].imgsPaths[carouselImgIndex]"
          :alt="`img_${carouselImgIndex}`"
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
          :class="{ 'carousel-btn-enabled': carouselImgIndex !== 0 }"
          >&lt;</span
        >
        <span
          @click="nextImg"
          class="carousel-btn carousel-btn-proj carousel-next"
          :class="{
            'carousel-btn-enabled':
              carouselImgIndex < currentProjectCarousel.imgsPaths.length - 1,
          }"
          >&gt;</span
        >
      </div>
    </div>
    <div class="projs-index">
      <div class="projs-title">
        <img src="data/projects/projects-drawing.png" alt="projects-drawing" />
        <h1>My Projects</h1>
      </div>
      <ul class="projs-list">
        <li v-for="(proj, index) in projects" :key="index">
          <a :href="'#' + proj.name" class="link proj-card">
            <img
              :src="`data/projects/${proj.name}/icon.png`"
              :alt="`${proj.name}_icon`"
              class="proj-icon"
            />
            {{ proj.fullName }}
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
        v-if="proj.description.length <= 0"
        src="data/projects/wip.png"
        alt="Work In Progress"
        class="proj-wip"
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
          v-for="(imgPath, imgIndex) of proj.imgsPaths"
          :key="imgIndex"
          :src="imgPath"
          :alt="`img_${imgIndex + 1}`"
          @click="openCarousel(projIndex, imgIndex)"
          class="proj-img"
        />
      </div>
      <div><br /></div>
      <!-- <a href="#" class="link projs-index-btn">▲ Go to index ▲</a> -->
    </section>
  </div>
</template>

<script>
import mixin from "@/mixin.js";
import "@/styles/Projects.css";
import axios from "axios";

export default {
  name: "ProjectsComponent",
  data() {
    return {
      projects: [],
      isIndexBtnShown: false,
      popupProjIndex: null,
      projDownloadUrl: null,
      carouselProjIndex: null,
      carouselImgIndex: null,
    };
  },
  mixins: [mixin],
  async mounted() {
    window.addEventListener("scroll", this.checkScrollPos);
    this.updateRoute(this.$route.path);
    await this.fetchProjects();
    await this.checkDownloadable();
    await this.getImgPaths();
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
    projDownloadUrlIsString() {
      return typeof this.projDownloadUrl === "string";
    },
    currentProjectCarousel() {
      if (this.carouselProjIndex !== null) {
        return this.projects[this.carouselProjIndex];
      }
      return null;
    },
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
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    },
    async checkDownloadable() {
      for (let i = 0; i < this.projects.length; i++) {
        const proj = this.projects[i];
        let downloadable = false;
        if (proj.url.length === 0) {
          downloadable = true;
        }
        this.projects[i]["downloadable"] = downloadable;
      }
    },
    async getImgPaths() {
      for (let i = 0; i < this.projects.length; i++) {
        const proj = this.projects[i];
        const paths = [];
        for (let j = 0; j < proj.imgsQty; j++) {
          const imgPath = `data/projects/${proj.name}/img_${j + 1}.gif`;
          paths.push(imgPath);
        }
        this.projects[i]["imgsPaths"] = paths;
      }
    },
    checkScrollPos() {
      this.isIndexBtnShown = window.scrollY !== 0;
    },
    async getProjUrl() {
      const res = await axios.post(`${this.$config.serverUrl}/download-url`, {
        fileName: `${this.currentProjectPopup.name}.zip`,
      });
      this.projDownloadUrl = res.data.downloadUrl;
    },
    openPopup(popupProjIndex) {
      this.popupProjIndex = popupProjIndex;
      this.getProjUrl();
    },
    closePopup() {
      this.popupProjIndex = null;
      this.projDownloadUrl = null;
    },
    openCarousel(carouselProjIndex, carouselImgIndex) {
      this.carouselProjIndex = carouselProjIndex;
      this.carouselImgIndex = carouselImgIndex;
    },
    closeCarousel() {
      this.carouselProjIndex = null;
      this.carouselImgIndex = null;
    },
    prevImg() {
      const minIndex = 0;
      this.carouselImgIndex--;
      if (this.carouselImgIndex < minIndex) {
        this.carouselImgIndex = minIndex;
      }
    },
    nextImg() {
      const maxIndex =
        this.projects[this.carouselProjIndex].imgsPaths.length - 1;
      this.carouselImgIndex++;
      if (this.carouselImgIndex > maxIndex) {
        this.carouselImgIndex = maxIndex;
      }
    },
  },
};
</script>
