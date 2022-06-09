import { createApp } from 'vue';
import App from './App.vue';
import Router from './router';
import piniaStore from './store';
import './samples/node-api';
import './styles/index.scss';

// import { initTable } from './utils/db';
// initTable();

import './permission';
const app = createApp(App);
app.use(Router);
app.use(piniaStore);
app.mount('#app').$nextTick(window.removeLoading);
