<template>
  <div id="hall">
    <section id="welcome">
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
        <router-link to="/projects" class="button welcome-portfolio-btn">
          Portfolio</router-link
        >
      </div>
      <a href="#about" class="arrow-down">↓</a>
      <div class="waves-mid">
        <img src="data/waves_mid.svg" alt="waves_mid" />
      </div>
    </section>
    <section id="about">
      <h2>About me</h2>
      <div class="profile">
        <img
          class="profile-img"
          src="data/profile_photo.webp"
          alt="profile_photo"
        />
        <div class="profile-details">
          <p>
            Crafting with logical thinking, I bring attention to detail and
            loads of patience to the team. I don't hesitate to bring proactive
            solutions to the table for our digital projects. <br /><br />If you
            wish to know more, I invite you to check out my
            <a class="link-cv" href="/cv">CV</a>.
          </p>
          <div class="profile-contact">
            <h4>Let's connect!</h4>
            <router-link to="/contact" class="button about-contact-btn"
              >Contact me</router-link
            >
          </div>
        </div>
      </div>
      <div class="skills">
        <h3>My Skills</h3>
        <div class="carousel-container">
          <div
            class="carousel-btn"
            @click="prevSkills"
            :style="getCarouselBtnStyle('prev')"
          >
            &lt;
          </div>
          <div class="carousel">
            <ul
              class="skills-list"
              :style="{
                left: `${carouselIndex * (smallScreen ? -50 : -100)}px`,
              }"
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
            @click="nextSkills"
            :style="getCarouselBtnStyle('next')"
          >
            &gt;
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "HallComponent",
  data() {
    return {
      smallScreen: false,
      skills: [],
      carouselIndex: 0,
    };
  },
  mounted() {
    this.getScreenSize();
    this.fetchSkills();
  },
  methods: {
    getScreenSize() {
      this.smallScreen = window.innerWidth < 600;
    },
    async fetchSkills() {
      try {
        const res = await fetch(`${this.$config.serverUrl}/skills`);
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
    nextSkills() {
      this.carouselIndex = this.carouselIndex + 5;
      if (this.carouselIndex > this.skills.length - 5) {
        this.carouselIndex = this.skills.length - 5;
      }
    },
    prevSkills() {
      this.carouselIndex = this.carouselIndex - 5;
      if (this.carouselIndex < 0) this.carouselIndex = 0;
    },
    getCarouselBtnStyle(btn) {
      const style = {};
      if (
        (btn === "prev" && this.carouselIndex === 0) ||
        (btn === "next" && this.carouselIndex >= this.skills.length - 5)
      ) {
        style.cursor = "auto";
        style.opacity = 0.3;
        style.animation = "none";
      } else style.animation = `anim-carousel-${btn}-btn 2s infinite`;
      return style;
    },
  },
};
</script>
