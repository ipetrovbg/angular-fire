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
        if (user && user.auth && user.auth.uid && user.auth.displayName){
            this.user = user;
            this.uid = this.user.uid;
            this.displayName = this.user.auth.displayName;
            if ( this.user.auth.photoURL )
                this.photoURL = this.user.auth.photoURL;
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
