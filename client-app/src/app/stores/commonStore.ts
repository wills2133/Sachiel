import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../../models/serverError";

export default class CommonStore {
    error: ServerError | null = null; // no const/let/var
    token: string | null = window.localStorage.getItem('jwt');  // first load, no reaction
    appLoaded = false;

    constructor() {
        makeAutoObservable(this);

        reaction( // then react to change
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('jwt', token);
                } else {
                    window.localStorage.removeItem('jwt');
                }
            }
        )
    }

    setServerError = (error: ServerError) => {
        this.error = error;
    }

    setToken = (token: string | null) => {
        this.token = token;
        // if (token) window.localStorage.setItem('jwt', token);
        // else window.localStorage.removeItem('jwt');
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}