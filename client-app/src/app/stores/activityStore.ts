import { makeAutoObservable } from 'mobx';

export default class ActivityStore {
    title = 'Hellow from Mobx!'

    constructor() {
        // makeObservable(this, {
        //     title: observable,
        //     // setTitle: action.bound
        //     setTitle: action
        // })
        makeAutoObservable(this)
    }

    // setTitle() {
    //     this.title = this.title + '!'
    // }
    setTitle = () => {
        this.title = this.title + '!'
    }
}