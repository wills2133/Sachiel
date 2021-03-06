import { ChatComment } from "../../models/comment";
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";

const chatUrl = process.env.REACT_APP_CHAT_URL

export default class CommentStore {
    comments: ChatComment[] = [];
    hubConnection: HubConnection | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    createHubConnection = (activityId: string) => {
        if (store.activityStore.selectedActivity) {
            this.hubConnection = new HubConnectionBuilder()
                .withUrl(`${chatUrl}?activityId=${activityId}`, {
                    accessTokenFactory: () => store.userStore.user?.token!
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();

            this.hubConnection.start().catch(error => console.log('Error establishing connection: ', error));

            this.hubConnection.on('LoadComments', (comments: ChatComment[]) => {
                runInAction(() => {
                    comments.forEach(comment => {
                        comment.createdAt = new Date(comment.createdAt + 'Z');
                    })
                    this.comments = comments;
                });
            })
            this.hubConnection.on('ReceivedComment', (comment: ChatComment) => {
                runInAction(() => {
                    comment.createdAt = new Date(comment.createdAt);
                    this.comments.unshift(comment);
                });
            })
        }
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => console.log('Error stoping connection', error));
    }
    clearComments = () => {
        this.comments = [];
        this.stopHubConnection();
    }

    addComment = async (value: any) => {
        value.activityId = store.activityStore.selectedActivity?.id;
        try {
            console.log('value', value)
            await this.hubConnection?.invoke('SendComment', value);
        } catch (error) {
            console.log(error);
        }
    }
}