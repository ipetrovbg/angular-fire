import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { User } from './user';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  public user: BehaviorSubject<User>;

  constructor(private af: AngularFire, private router: Router) {
    if (!this.user) {
      this.user = <BehaviorSubject<User>> new BehaviorSubject(new User({}));
    }

    this.af.auth
    .subscribe( user => {
      if (user) {
        this.user.next(new User(user));
      } else {
        this.user.next(new User({}));
      };
    });
   }

  login() {
    this.af.auth.login();
    this.af.auth
    .subscribe(user => {
      if (user) {
        this.user.next( new User( user ));
      } else {
        this.user.next(new User({}));
      }
    });
  }

  logout() {
    this.af.auth.logout();
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
