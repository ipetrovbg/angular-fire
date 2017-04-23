import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddLinkDialogComponent } from '../add-link-dialog/add-link-dialog.component';

import { 
  MdSnackBar,
  MdSnackBarRef,
  MdDialog,
  MdDialogRef,
 } from '@angular/material';


import { FirebaseService } from '../core/firebase.service';
import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public links = [];
  public user: User;
  public logging: boolean = false;
  public form: FormGroup;
  public errorMessage: string;
  public isLoggedIn$: Observable<boolean>;

  constructor(
    private _fb: FormBuilder,
    private snackBar: MdSnackBar,
    private _afs: FirebaseService,
    private _us: UserService,
    private dialog: MdDialog
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
  openModal(event){
    if( this.user && this.user.isAuth() ){
        let dialogRef = this.dialog.open(AddLinkDialogComponent, {
          width: '750px',
        });
        dialogRef.afterClosed().subscribe(result => {

          if(!result) return;

          if(!result.state && result.data === false){
            this._handleMessage('Lnk was not created!',  ['warning'], null);
          }else if(result.state) {
            this._handleMessage('Link was created successfully!',  ['success'], null);
          }

        });
    }else{
      this._handleMessage('You need to sign in add new link!', ['error'], 'Login');
    }
     
  }


  // Private functions
  private _hendleSerachChange(): void {
    this.form.controls['search']
      .valueChanges
      .debounceTime(700)
      .subscribe(search => {
        if (this.form.valid && search.length >= 4 && this.user ){

          // make a serach
          this._doSerach(search);

        }else {
          this.links = [];
          this.logging = false;
          
        }
        
      });
  }
  private _handleMessage(message: string, classes: Array<string>, action: any) {
      this.snackBar.open(message, action, {
        duration: 10000,
        extraClasses: classes
      })
      .onAction()
      .subscribe(() => {
          this._us.login();
      });
  }

  private _doSerach(search){
    this._afs
      .searchLinks(search, `links/${this.user.uid}`)
      .subscribe(data => {
        this.links = data;
        this.logging = false;
      },
      error => {
          this.links = [];
          this.logging = false;
          this.errorMessage = "Error!";
          this._handleMessage('You need to sign in to search!', ['error'], 'Login');
      });
  }
  
}
