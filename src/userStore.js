import { action, makeObservable, observable } from 'mobx';

class UserStore {
	user = { name: '', _id: '' };
	constructor() {
		makeObservable(this, {
			user: observable,
			setUser: action,
		});
	}

	setUser = (user) => {
		this.user.name = user.name;
		this.user.id = user.id;
	};
}

export const userStore = new UserStore();
