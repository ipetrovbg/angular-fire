import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'app/user/user.service';
import { User } from '../user/user';
import { PcloudService } from '../core/pcloud.service';
import { FirebaseService } from '../core/firebase.service';
import { Router } from '@angular/router';
import { UtilService } from '../core/util.service';

@Component({
  selector: 'app-pclod-login',
  templateUrl: './pclod-login.component.html',
  styleUrls: ['./pclod-login.component.css']
})
export class PclodLoginComponent implements OnInit {
  public pcloudLoginForm: FormGroup;
  public user: User;
  constructor(
    private _fb: FormBuilder,
    private _us: UserService,
    private _pcloud: PcloudService,
    private _fbs: FirebaseService,
    private router: Router,
    private util: UtilService,
  ) { }

  ngOnInit() {
    this.util.setProgressState(true);
    this._us.getUser().subscribe(user => {
      this.user = user;
      if ( user.uid ) {
        this._fbs.getPcloudAuth(user.uid)
          .subscribe( pcloud => {
            this.util.setProgressState(false);
            if ( pcloud && pcloud.length && ((new Date().getTime() - 576000) < pcloud[1].$value)) {
              this.router.navigate(['profile']);
            }
          });
      }
    });
    this.pcloudLoginForm = this._fb.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });
  }

  /**
   * Login
   */
  public doLogin() {
    this.util.setProgressState(true);
    if ( this.user && this.user.uid && this.pcloudLoginForm.dirty && this.pcloudLoginForm.valid ) {
        this._pcloud.getUser(this.pcloudLoginForm.value)
          .subscribe( auth => {
              if ( auth && auth.auth ) {
                  this._fbs.updatePcloudAuth(auth.auth, this.user.uid);
              }
            this.util.setProgressState(false);
          });
    } else {
      this.util.setProgressState(false);
    }
  }
}
