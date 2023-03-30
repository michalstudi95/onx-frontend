import App from "./App.vue";

//packages
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";

//global components
import BaseButton from "./components/UI/BaseButton.vue";
import BaseAlert from "./components/UI/BaseAlert.vue";
import LoadSpinner from "./components/UI/LoadSpinner.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component("BaseButton", BaseButton);
app.component("BaseAlert", BaseAlert);
app.component("LoadSpinner", LoadSpinner);

app.mount("#app");
