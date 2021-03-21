import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import { User, UserFormValues } from "../../models/user";
import agent from "../api/agent";
import { store } from "./store";

export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !! this.user;
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds)
            console.log('user', user)
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            history.push('/activities');
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        runInAction(() => this.user = null);
        history.push('/');
    }
}