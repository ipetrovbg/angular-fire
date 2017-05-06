import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../user/user.service';

import { User } from 'app/user/user';
import { PcloudService } from 'app/core/pcloud.service';
import { FirebaseService } from 'app/core/firebase.service';
import { PocketService } from 'app/core/pocket.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  daily: number;
  total: number;
  public pcloudAuthMsg: string;
  public pcloudData: {quota: number, usedquota: number} = {quota: 0, usedquota: 0};
  public user: User;
  private subscription: Subscription = new Subscription();
  constructor(
    private _us: UserService,
    private pcloud: PcloudService,
    private router: Router,
    private fb: FirebaseService,
    private pocket: PocketService
  ) {}

  ngOnInit() {
    this.subscription.add(this._us.getUser().subscribe(user => {
      this.user = user;
      this.subscription.add(this.fb.getPcloudAuth(user.uid)
        .subscribe(auth => {
          if ( auth && auth.length && ((new Date().getTime() - 576000) < auth[1].$value) ) {
            this.pcloud.getUserByAuth(auth[0].$value)
              .subscribe(data => {
                if ( !data.error ) {
                  this.pcloudData = data;
                } else {
                  this.pcloudAuthMsg = 'Authentication required!';
                }
              });
          } else {
            this.pcloudAuthMsg = 'Authentication required!';
          }
        }));
      this.subscription.add(this.pocket.getSalaryAndDailyMoney().subscribe(data => {
        this.daily = data.daily;
        this.total = data.total;
      }));

    }));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
