import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { User } from './user';
import { CounterActions } from '../actions';

@Injectable()
export class UserService {
  public user: BehaviorSubject<User>;

  constructor(private actions: CounterActions, private afAuth: AngularFireAuth) {
    if (!this.user) {
      this.user = <BehaviorSubject<User>> new BehaviorSubject(new User({}));
    }

    this.afAuth.authState
    .subscribe( user => {
      if (user) {
        this.actions.updateUser(new User(user));
        this.user.next(new User(user));
      } else {
        this.actions.updateUser(new User({}));
        this.user.next(new User({}));
      };
    });
   }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.afAuth.authState
    .subscribe(user => {
      console.log(user);
      if (user) {
        this.actions.updateUser(new User(user));
        this.user.next( new User( user ));
      } else {
        this.actions.updateUser(new User(user));
        this.user.next(new User({}));
      }
    });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.actions.updateUser(new User({}));
    this.user.next(new User({}));
  }

  getUser(): Observable<User> {
    return this.user.asObservable();
  }

  isAuth (): Observable<boolean> {
    const subject = new BehaviorSubject(false);
    this.getUser().subscribe(user => {
      user.user ? subject.next(true) : subject.next(false);
    });
    return subject;
  }

}
