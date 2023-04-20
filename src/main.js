import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import Andt from "ant-design-vue";
import { createPinia } from "pinia";
import "ant-design-vue/dist/antd.css";

import { loadFonts } from "./plugins/webfontloader";

loadFonts();

createApp(App)
  .use(router)
  .use(Andt)
  .use(createPinia())
  .use(vuetify)
  .mount("#app");
