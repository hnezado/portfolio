<template>
  <nav @mouseleave="closeMenu" class="navbar">
    <ul class="navbar-btn-container" :class="{ show: showMenu }">
      <li :class="{ 'active-tab': currentRoute === '/' }">
        <a href="/">Hall</a>
      </li>
      <li :class="{ 'active-tab': currentRoute === '/projects' }">
        <a href="/projects">Projects</a>
      </li>
      <li :class="{ 'active-tab': currentRoute === '/contact' }">
        <a href="/contact">Contact</a>
      </li>
    </ul>
    <a @mouseover="openMenu" class="menu-icon">&#9776;</a>
  </nav>
</template>

<script>
export default {
  name: "NavbarComponent",
  props: {
    currentRoute: String,
  },
  data() {
    return {
      showMenu: false,
      tabActive: "",
    };
  },
  methods: {
    openMenu() {
      this.showMenu = true;
    },
    closeMenu() {
      this.showMenu = false;
    },
  },
};
</script>
