import { makeAutoObservable, runInAction } from "mobx";
import { Photo, Profile } from "../../models/profile";
import agent from "../api/agent";
import { store } from "./store";

export default class ProfileStore {
    profile: Profile | null = null;
    loadingProfile = false;
    uploadingPhoto = false;
    loadingPhoto = false;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    get isCurrentUser() {
        if (store.userStore.user && this.profile) {
            return store.userStore.user.username === this.profile.username;
        }
        return false;
    }

    loadProfile = async (username: string) => {
        this.loadingProfile = true;
        try {
            const profile = await agent.Profiles.get(username);
            runInAction(() => this.profile = profile);
            
        } catch (error) {
            console.log(error)
        } finally {
            runInAction(() => this.loadingProfile = false);
        }
    }

    uploadPhoto = async (file: Blob) => {
        this.uploadingPhoto = true;
        try {
            const response = await agent.Profiles.uplaodPhoto(file);
            const photo = response.data;
            runInAction(() => {
                if (this.profile) {
                    this.profile?.photos?.push(photo)
                    if (photo.isMain && store.userStore.user) {
                        store.userStore.setImage(photo);
                        this.profile.image = photo.url;
                    }
                }
            });
        } catch(error) {
            console.log(error)
        } finally {
            runInAction(() => this.uploadingPhoto = false);
        }
    }

    setMain = async (photo: Photo) => {
        this.loadingPhoto = true;
        try {
            await agent.Profiles.setMain(photo.id);
            store.userStore.setImage(photo.url);
            runInAction(() => {
                if (this.profile && this.profile.photos) {
                    this.profile.photos.find(p => p.isMain)!.isMain = false;
                    this.profile.photos.find(p => p.id === photo.id)!.isMain = true;
                    this.profile.image = photo.url;
                    this.loadingPhoto = false;
                }
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingPhoto = false);
        }
    }

    deletePhoto = async (photo: Photo) => {
        this.loadingPhoto = true;
        try {
            if (this.profile && !photo.isMain) await agent.Profiles.deletePhoto(photo.id);
            this.profile!.photos = this.profile?.photos?.filter(p => p.id !== photo.id);
        } catch(error) {
            console.log(error);
        } finally {
            runInAction(() => this.loadingPhoto = false);
        }
    }

    updateFollowing = async (username: string, following: boolean) => {
        this.loading = true;
        try {
            await agent.Profiles.updateFollowing(username);
            store.activityStore.updateAttendeeFollowing(username);
            runInAction(() => {
                if (this.profile && this.profile.username !== store.userStore.user?.username) {
                    following ? this.profile.followersCount-- : this.profile.followersCount++;
                    this.profile.following = !this.profile.following;
                }
            })
        } catch (error) {
            console.log(error)
        } finally {
            runInAction(() => this.loading = false);
        }
    }

}