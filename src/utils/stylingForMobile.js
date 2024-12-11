export default {
  computed: {
    isMobile() {
      const isMobile = this.$vuetify.display.xs;
      return isMobile;
    },
    hasNoPaddingForMobile() {
      return this.isMobile ? "pa-0" : "";
    },
    isNotRoundedForMobile() {
      return this.isMobile ? "0" : "lg";
    },
  },
};
