import "vuetify/styles";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

import { createVuetify } from "vuetify";

export default createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});
