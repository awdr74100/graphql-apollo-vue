import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import {
  DefaultApolloClient,
  apolloClient,
} from "@/plugins/vue-apollo-composable";

import "@/assets/scss/all.scss";
import "bootstrap/dist/js/bootstrap.bundle";

const app = createApp(App);

app.use(router).provide(DefaultApolloClient, apolloClient);

app.mount("#app");
