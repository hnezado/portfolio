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
      <div class="spruce-bg">
        <img src="data/waves_spruce.svg" alt="waves_spruce" />
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
          <span>&lt;</span>
          <div class="carousel">
            <ul class="skills-list">
              <li>
                <img src="data/logos/python.svg" alt="logo_python" /><span
                  >Python</span
                >
              </li>
              <li>
                <img
                  src="data/logos/javascript.svg"
                  alt="logo_javascript"
                /><span>Javascript</span>
              </li>
              <li>
                <img src="data/logos/html.svg" alt="logo_html" /><span
                  >HTML</span
                >
              </li>
              <li>
                <img src="data/logos/css.svg" alt="logo_css" /><span>CSS</span>
              </li>
              <li>
                <img src="data/logos/nodejs.svg" alt="logo_nodejs" /><span
                  >Node.js</span
                >
              </li>
              <li>
                <img src="data/logos/react.svg" alt="logo_react" /><span
                  >React</span
                >
              </li>
              <li>
                <img src="data/logos/vue.svg" alt="logo_vue" /><span>Vue</span>
              </li>
              <li>
                <img src="data/logos/git.svg" alt="logo_git" /><span>Git</span>
              </li>
              <li>
                <img src="data/logos/linux.svg" alt="logo_linux" /><span
                  >Linux</span
                >
              </li>
              <li>
                <img src="data/logos/aws.svg" alt="logo_aws" /><span>AWS</span>
              </li>
              <li>
                <img src="data/logos/docker.svg" alt="logo_docker" /><span
                  >Docker</span
                >
              </li>
              <li>
                <img src="data/logos/flask.svg" alt="logo_flask" /><span
                  >Flask</span
                >
              </li>
              <li>
                <img src="data/logos/jira.svg" alt="logo_jira" /><span
                  >JIRA</span
                >
              </li>
              <li>
                <img src="data/logos/cobol.svg" alt="logo_cobol" /><span
                  >Cobol</span
                >
              </li>
              <li>
                <img src="data/logos/c-sharp.svg" alt="logo_c-sharp" /><span
                  >C#</span
                >
              </li>
            </ul>
          </div>
          <span>&gt;</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "HallComponent",
  data() {
    // carouselIndex: 0
  },
  mounted() {},
};
</script>
