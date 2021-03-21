import { makeAutoObservable } from "mobx";
import { ServerError } from "../../models/serverError";

export default class CommonStore {
    error: ServerError | null = null; // no const/let/var
    token: string | null = null;
    appLoaded = false;

    constructor() {
        makeAutoObservable(this);
    }

    setServerError = (error: ServerError) => {
        this.error = error;
    }

    setToken = (token: string | null) => {
        this.token = token;
        if (token) window.localStorage.setItem('jwt', token);
        else window.localStorage.removeItem('jwt');
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}