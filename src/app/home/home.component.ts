import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store/lib/src';
import { Observable } from 'rxjs/Rx';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddLinkDialogComponent } from '../add-link-dialog/add-link-dialog.component';
import { MdDialog, MdDialogRef } from '@angular/material';


import { FirebaseService } from '../core/firebase.service';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { SnackService } from '../snack.service';
import { UtilService } from '../core/util.service';
import { CounterActions } from '../actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  @select() public readonly searchLinkResults$: Observable<Array<any>>;
  @select() public readonly requestForLinks$: Observable<boolean>;
  public user: User;
  public form: FormGroup;
  public errorMessage: string;

  constructor(
    private _fb: FormBuilder,
    private snack: SnackService,
    private _afs: FirebaseService,
    private _us: UserService,
    private dialog: MdDialog,
    private util: UtilService,
    private actions: CounterActions
    ) {}

  ngOnInit() {
    this._us.getUser().subscribe(user => this.user = user);

    this.form = this._fb.group({
        search: ['', Validators.compose([Validators.minLength(4)])]
    });
    // subscribing to change
    this._hendleSerachChange();
  }

  /**
   *
   * @param event
   */
  openModal(event) {
    if ( this.user && this.user.isAuth() ) {
        const dialogRef: MdDialogRef<any> = this.dialog.open(AddLinkDialogComponent, {
          width: '750px',
        });
        dialogRef.afterClosed().subscribe(result => {

          if (!result) {
            return;
          }

          if (!result.state && result.data === false) {
            this._handleMessage('Lnk was not created!',  ['warning'], null);
          }else if (result.state) {
            this._handleMessage('Link was created successfully!',  ['success'], null);
          }

        });
    } else {
      this._handleMessage('You need to sign in add new link!', ['error'], 'Login');
    }

  }


  // Private functions
  private _hendleSerachChange(): void {
    this.form.controls['search']
      .valueChanges
      .debounceTime(700)
      .subscribe(search => {
        this.actions.requestForLinks(true);
        this.util.setProgressState(true);
        if (this.form.valid && search.length >= 4 && this.user ) {

          // make a serach
          this._doSerach(search);

        }else {
          this.actions.requestForLinks(false);
          this.actions.setLinksResult([]);
          this.util.setProgressState(false);
        }

      });
  }
  private _handleMessage(message: string, classes: Array<string>, action: any) {
      this.snack.snack(message, classes, action)
      .subscribe(() => {
          this._us.login();
      });
  }

  private _doSerach(search) {
    this._afs
      .searchLinks(search, `links/${this.user.uid}`)
      .map(data => {
        data.forEach(element => {
          element.state = 'inactive';
        });
        return data;
      })
      .subscribe(data => {
        this.actions.requestForLinks(false);
        this.actions.setLinksResult(data);
        this.util.setProgressState(false);
      },
      error => {
        this.actions.requestForLinks(false);
        this.actions.setLinksResult([]);
        this.util.setProgressState(false);
        this.errorMessage = 'Error!';
        this._handleMessage('You need to sign in to search!', ['error'], 'Login');
      });
  }
}
