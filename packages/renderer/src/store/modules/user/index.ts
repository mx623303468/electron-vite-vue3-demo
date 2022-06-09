import { defineStore } from 'pinia';

interface stateInterface {
	token: number | null;
	personId: string;
	examId: string;
}

export const useUserStore = defineStore('user', {
	state: () =>
		({
			token: null,
			personId: '',
			examId: '',
		} as stateInterface),
	actions: {
		login(user: { personId: any; examId: any }) {
			this.token = Date.now();
			this.personId = user.personId;
			this.examId = user.examId;

			sessionStorage.setItem('token', JSON.stringify(this.token));
			sessionStorage.setItem('personId', JSON.stringify(this.personId));
			sessionStorage.setItem('examId', JSON.stringify(this.examId));
		},
	},
});
