import { defineStore } from 'pinia';

interface stateInterface {
	current: string | number;
	collapse: boolean;
}

export const useSystemStore = defineStore('system', {
	state: () =>
		({
			collapse: false,
			current: '',
		} as stateInterface),
	actions: {
		toggleCollapse() {
			this.collapse = !this.collapse;
		},
		toggleTopic(id: string | number) {
			this.current = id;
		},
	},
});
