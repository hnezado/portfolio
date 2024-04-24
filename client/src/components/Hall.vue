<template>
  <div id="hall">
    <section id="welcome">
      <div class="welcome-content">
        <h1 class="welcome-title">Welcome to my creative hub</h1>
        <div class="name-text">
          <p>My name is</p>
          <div class="anim-name"><span>Hector</span><span>Martinez</span></div>
        </div>
        <div class="welcome-description">
          <p>
            Software developer and creative thinker. I specialize in both coding
            and design, offering a personalized touch to your website projects.
          </p>
          <router-link to="/projects" class="button"> Portfolio</router-link>
        </div>
      </div>
      <div class="welcome_waves">
        <img src="data/waves_mid.svg" alt="waves_welcome" />
        <a href="#about" class="arrow">↓</a>
      </div>
    </section>
    <section id="about">
      <div class="about-bg"></div>
      <div class="about-content">
        <h2>About me</h2>
        <div class="profile-container">
          <div class="profile">
            <img
              class="profile-img"
              src="data/profile_photo.webp"
              alt="profile_photo"
            />
            <div class="profile-details">
              <p
                :class="{ 'text-animation': animStart.profileDetails }"
                ref="profileDetails"
              >
                Crafting with logical thinking, I bring attention to detail and
                loads of patience to the team. I don't hesitate to bring
                proactive solutions to the table for our digital projects.
                <br /><br />If you wish to know more, I invite you to check out
                my
                <a
                  class="link-light"
                  target="_blank"
                  href="data/cv_hector_martinez.pdf"
                  >CV</a
                >
                (<a
                  class="link-light"
                  href="data/cv_hector_martinez.pdf"
                  download
                  >download</a
                >).
              </p>
              <div class="profile-contact" ref="profileContactTitle">
                <h4
                  :class="{ 'text-animation': animStart.profileContactTitle }"
                >
                  Let's connect!
                </h4>
                <router-link to="/contact" class="button about-contact-btn"
                  >Contact me</router-link
                >
              </div>
            </div>
          </div>
        </div>
        <div class="skills-container">
          <h3>My Skills</h3>
          <div class="carousel-container">
            <div
              class="carousel-btn"
              :class="{ 'carousel-btn-enabled': carouselIndex !== 0 }"
              @click="prevSkills"
              :style="getCarouselBtnStyle('prev')"
            >
              &lt;
            </div>
            <div class="carousel" ref="carousel">
              <ul
                class="skills"
                :class="{ 'skills-anim': animStart.carousel }"
                :style="{ left: getCarouselSpeed() }"
              >
                <li v-for="(skill, index) in skills" :key="index">
                  <img
                    :src="`data/logos/${skill.name}.svg`"
                    :alt="`logo_${skill.name}`"
                  /><span>{{ skill.fullName }}</span>
                </li>
              </ul>
            </div>
            <div
              class="carousel-btn"
              :class="{
                'carousel-btn-enabled':
                  carouselIndex < skills.length - skillsPerView,
              }"
              @click="nextSkills"
              :style="getCarouselBtnStyle('next')"
            >
              &gt;
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import mixin from "@/mixin.js";
import "@/styles/Hall.css";

export default {
  name: "HallComponent",
  data() {
    return {
      smallScreen: false,
      skills: [],
      elementsToObserve: [
        ["profileDetails", 0.1],
        ["profileContactTitle", 0.1],
        ["carousel"],
      ],
      animStart: {},
      skillsPerView: 5,
      carouselIndex: 0,
    };
  },
  mixins: [mixin],
  mounted() {
    this.updateRoute(this.$route.path);
    this.fetchSkills();
    this.elementsToObserve.forEach((args) => this.observeElement(...args));
  },
  methods: {
    async fetchSkills() {
      try {
        const res = await fetch(`${this.$config.serverUrl}/skills`, {
          method: "GET",
          mode: "cors",
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          if (data.length > 0) {
            this.skills = data;
          }
        }
      } catch (error) {
        console.error("Error fetching skills", error);
      }
    },
    getCarouselSpeed() {
      const width = window.innerWidth;
      let speed;
      if (width <= 350) speed = 40;
      else if (width <= 600) speed = 50;
      else speed = 100;
      return `${this.carouselIndex * -speed}px`;
    },
    nextSkills() {
      this.carouselIndex = this.carouselIndex + this.skillsPerView;
      if (this.carouselIndex > this.skills.length - this.skillsPerView) {
        this.carouselIndex = this.skills.length - this.skillsPerView;
      }
    },
    prevSkills() {
      this.carouselIndex = this.carouselIndex - this.skillsPerView;
      if (this.carouselIndex < 0) this.carouselIndex = 0;
    },
    getCarouselBtnStyle(btn) {
      const style = {};
      if (
        (btn === "prev" && this.carouselIndex === 0) ||
        (btn === "next" &&
          this.carouselIndex >= this.skills.length - this.skillsPerView)
      ) {
        style.animation = "none";
      } else style.animation = `anim-carousel-${btn}-btn 2s infinite`;
      return style;
    },
  },
};
</script>
