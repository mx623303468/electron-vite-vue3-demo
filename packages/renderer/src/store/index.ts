import { createPinia } from 'pinia';

const pinia = createPinia();

export { useSystemStore } from './modules/system';

export default pinia;
