import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CanActivate } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs';

@Injectable()
export class LoggedinGard implements CanActivate {

    constructor(private af: AngularFire) {}

    canActivate(): Observable<boolean> | boolean {
        return this.af.auth.map(user => {
            return user ? true : false;
        }).take(1);
    }
}
