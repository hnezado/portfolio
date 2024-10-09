<template>
  <div id="contact">
    <h1>Contact me</h1>
    <p><em>Let's create something amazing together!</em></p>
    <form @submit.prevent="sendEmail" class="contact-form">
      <label for="name">Your name:</label>
      <input v-model="formData.name" type="text" id="name" required />
      <label for="email">Your email:</label>
      <input v-model="formData.email" type="text" id="email" required />
      <label for="subject">Subject:</label>
      <input v-model="formData.subject" type="text" id="subject" required />
      <label for="message">Message:</label>
      <textarea v-model="formData.message" id="message" required></textarea>
      <button class="button" type="submit">Send message</button>
    </form>
    <div class="email-response-msg">
      <p v-if="loading">Sending email...</p>
      <p v-else :class="{ success: emailSucceeded, fail: !emailSucceeded }">
        {{ emailResponseMessage }}
      </p>
    </div>
    <span>
      Or if you prefer you can send me an email directly to <br />
      <a
        v-if="contactConfig"
        :href="`mailto:hnezado@gmail.com?subject=<From%20${
          formData.name
        }>${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
          formData.message
        )}`"
        class="link"
        >{{ contactConfig.mainContact }}</a
      >
    </span>
  </div>
</template>

<script>
import mixin from "@/mixin.js";
import "@/styles/Contact.css";

export default {
  name: "ContactComponent",
  data() {
    return {
      contactConfig: null,
      formData: {
        name: "",
        email: "",
        subject: "",
        message: "",
      },
      loading: false,
      emailResponseMessage: "",
      emailSucceeded: false,
    };
  },
  mixins: [mixin],
  async mounted() {
    this.updateRoute(this.$route.path);
    this.fetchContactConfig();
  },
  methods: {
    async fetchContactConfig() {
      try {
        const apiUrl = `${process.env.VUE_APP_API_URL}/config/contact`;
        const response = await fetch(apiUrl);
        this.contactConfig = await response.json();
      } catch (error) {
        const msg = "Error fetching contact config";
        console.error(msg, error);
      }
    },
    async sendEmail() {
      this.loading = true;
      try {
        const res = await fetch(`${process.env.VUE_APP_API_URL}/send-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.formData),
        });

        // Clear and reset form fields
        Object.keys(this.formData).forEach((key) => {
          this.formData[key] = "";
        });

        const response = await res.json();
        this.setResponseMessage(response);
      } catch (error) {
        console.error("Error posting email data", error);
      }
    },
    setResponseMessage(response) {
      if (response && response.message) {
        this.emailResponseMessage = response.message;
      } else {
        this.emailResponseMessage = "Something went wrong";
      }
      this.emailSucceeded = this.checkSuccessMessage();
      this.loading = false;
    },
    checkSuccessMessage() {
      return this.emailResponseMessage.includes("success");
    },
  },
};
</script>
