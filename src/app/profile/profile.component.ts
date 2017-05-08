import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog, MdDialogRef } from '@angular/material';
import { LogMoneyComponent } from '../components/log-money/log-money.component';
import { UserService } from '../user/user.service';

import { User } from 'app/user/user';
import { PcloudService } from 'app/core/pcloud.service';
import { FirebaseService } from 'app/core/firebase.service';
import { PocketService } from 'app/core/pocket.service';
import { UtilService } from '../core/util.service';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { CounterActions } from '../actions';
import { SnackService } from '../snack.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  @select() public readonly links$: Observable<Array<any>>;
  @select() public readonly requestForLinksMaded$: Observable<Array<any>>;
  daily: number;
  total: number;
  public pcloudAuthMsg: string;
  public pcloudData: {quota: number, usedquota: number} = {quota: 0, usedquota: 0};
  public user: User;
  private subscription: Subscription = new Subscription();

  constructor(
    private _us: UserService,
    private pcloud: PcloudService,
    private snack: SnackService,
    private router: Router,
    private fb: FirebaseService,
    private pocket: PocketService,
    private util: UtilService,
    private actions: CounterActions,
    private dialog: MdDialog,
  ) {}

  ngOnInit() {

    this.util.setProgressState(true);
    this.subscription.add(
      this._us.getUser()
        .flatMap(user => {
          this.user = user;
          if (user.uid) {
            this.util.setProgressState(true);
            return this.fb.getPcloudAuth(user.uid);
          } else {
            return Observable.of([]);
          }
        })
      .flatMap(auth => {
        if ( auth && auth.length && ((new Date().getTime() - 576000) < auth[1].$value) ) {
          this.util.setProgressState(true);
          return this.pcloud.getUserByAuth(auth[0].$value);
        }else {
          this.util.setProgressState(false);
          this.pcloudAuthMsg = 'Authentication required!';
          return Observable.of({});
        }
      })
      .subscribe(data => {
        if ( data.quota && data.usedquota ) {
          this.pcloudData = data;
        }

        this.requestForLinksMaded$
          .subscribe(isMaded => {
            if ( !isMaded ) {
              this.fb.database(`links/${this.user.uid}`).subscribe(snap => this.actions.setLink(snap));
            }
          });

        this.util.setProgressState(false);
    }));
    this.subscription.add(this.pocket.getSalaryAndDailyMoney().subscribe(data => {
      this.daily = data.daily;
      this.total = data.total;
    }));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public loadAllLinks = () => {
    this.router.navigate(['/links']);
  }
  public logMoney() {
    const dialogRef: MdDialogRef<any> = this.dialog.open(LogMoneyComponent, {
      width: '750px',
      height: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if ( result ) {
        this.snack.snack('Money was added!',  ['success'], null);
      }
    });
  }
}
