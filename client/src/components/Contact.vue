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
    <span>
      Or if you prefer you can send me an email directly to <br />
      <a
        :href="`mailto:hnezado@gmail.com?subject=<From%20${
          formData.name
        }>${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
          formData.message
        )}`"
        class="link"
        >hnezado@gmail.com</a
      >
    </span>
  </div>
</template>

<script>
import mixin from "@/mixin.js";
import "@/styles/Contact.css";
import axios from "axios";

export default {
  name: "ContactComponent",
  data() {
    return {
      formData: {
        name: "",
        email: "",
        subject: "",
        message: "",
      },
    };
  },
  mixins: [mixin],
  mounted() {
    this.updateRoute(this.$route.path);
  },
  methods: {
    async sendEmail() {
      try {
        const res = await axios.post(
          `${this.$config.serverUrl}/send-email`,
          this.formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Clear and reset form fields
        Object.keys(this.formData).forEach((key) => {
          this.formData[key] = "";
        });

        const response = res.data;
        console.log("Response from server:", response);
      } catch (error) {
        console.error("Error posting email data", error);
      }
    },
  },
};
</script>
