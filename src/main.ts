import './assets/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { http, endpoint } from '@/utils';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.provide('http', http);
app.provide('endpoint', endpoint);

app.mount('#app');
