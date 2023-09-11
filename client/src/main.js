import { createApp } from "vue";
import App from "@/App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import "@/registerServiceWorker";
import router from "@/router/router";
import directives from "@/directives/index";
import store from "@/store/store";

const app = createApp(App);
directives.forEach((directive) => {
    app.directive(directive.name, directive);
});
app.use(VueAxios, axios);
app.use(store).use(router).mount("#app");
