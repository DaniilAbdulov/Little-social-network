import { createApp } from "vue";
import App from "@/App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import "@/registerServiceWorker";
import router from "@/router/router";
import store from "@/store/store";

const app = createApp(App);
app.use(VueAxios, axios);
app.use(store).use(router).mount("#app");
