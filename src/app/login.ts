import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CanActivate } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class LoggedinGard implements CanActivate {

    constructor(private af: AngularFireAuth) {}

    canActivate(): Observable<boolean> | boolean {
        return this.af.authState.map(user => {
            return user ? true : false;
        }).take(1);
    }
}
