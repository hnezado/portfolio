export default {
  methods: {
    updateRoute(route) {
      this.$emit("updateRoute", route);
    },
    observeElement(refName, threshold = 1) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.animStart[refName] = true;
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: threshold }
      );
      const element = this.$refs[refName];
      observer.observe(element);
    },
  },
};
