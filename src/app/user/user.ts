export interface IUser {
    uid: string;
    displayName: string;
    photoURL?: string;
}

export class User implements IUser {
    public uid: string;
    public displayName: string;
    public photoURL?: string;
    private _user: any;

    constructor( user ) {
        if (user && user.uid && user.displayName) {
            this.user = user;
            this.uid = this.user.uid;
            this.displayName = this.user.displayName;
            if ( this.user.photoURL )
                this.photoURL = this.user.photoURL;
        }
    }

    public isAuth() {
        return this.user ? true : false;
    }

    get user(): any {
        return this._user;
    }
    set user(user: any) {
        this._user = user;
    }
}
