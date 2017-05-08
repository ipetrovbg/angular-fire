import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'app/core/firebase.service';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from 'app/user/user.service';

import { User } from 'app/user/user';
import { PcloudService } from 'app/core/pcloud.service';
import { SnackService } from 'app/snack.service';
import { UtilService } from '../core/util.service';

@Component({
  selector: 'app-pcloud',
  templateUrl: './pcloud.component.html',
  styleUrls: ['./pcloud.component.css']
})
export class PcloudComponent implements OnInit, OnDestroy {
  public folders: Array<Object>;
  private user: User;
  private subscription: Subscription = new Subscription();
  private columns: number;
  private rolspan: number;
  constructor(
    private _fb: FirebaseService,
    private _us: UserService,
    private _pcloud: PcloudService,
    private router: Router,
    private snack: SnackService,
    private util: UtilService
  ) {}

  ngOnInit() {
    this.util.setProgressState(true);
    this._us.getUser().subscribe(user => this.user = user);
    this.subscription.add(
      this._fb.getPcloudAuth(this.user.uid)
        .subscribe(data => {
            if ( data && data.length && ((new Date().getTime() - 576000) < data[1].$value)) {
              this.subscription.add(
                this._pcloud.listFolder(0, data[0].$value)
                  .subscribe(folders => {
                    this.util.setProgressState(false);
                    this.folders = folders;
                  })
              );
            } else {
              this.util.setProgressState(false);
              this.router.navigate(['pcloud-login']);
            }
          },
          error => {
            this.snack.snack('Permission error', ['error'], null);
            this.router.navigate(['home']);
          })
    );
    this._updateColumns(window.innerWidth);
    this._updateRolspan(window.innerWidth);
    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      this._updateColumns(width);
      this._updateRolspan(window.innerWidth);
    }, true);
  }
  ngOnDestroy() {
    this.util.setProgressState(false);
    this.subscription.unsubscribe();
  }

  getColumns(): number {
    return this.columns;
  }

  getRolspan(): number {
    return this.rolspan;
  }
  private _updateColumns(width: number): void {
    if (width >= 1300) {
      this.columns = 1;
    } else if (width < 1300 && width > 1000) {
      this.columns = 2;
    }  else if (width < 1000 && width > 700) {
      this.columns = 2;
    } else {
      this.columns = 3;
    }
  }
  private _updateRolspan(width: number): void {
    if (width >= 1300) {
      this.rolspan = 1;
    } else if (width < 1300 && width > 1000) {
      this.rolspan = 1.5;
    } else if (width < 1000 && width > 700) {
      this.rolspan = 1.4;
    } else {
      this.rolspan = 1.5;
    }
  }
}
