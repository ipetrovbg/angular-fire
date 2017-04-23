import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MdDialogRef } from '@angular/material';

import { FirebaseService } from '../core/firebase.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user';
// import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-add-link-dialog',
  templateUrl: './add-link-dialog.component.html',
  styleUrls: ['./add-link-dialog.component.css']
})
export class AddLinkDialogComponent implements OnInit {

  public form: FormGroup;
  public user: User;
  constructor(
      public dialogRef: MdDialogRef<AddLinkDialogComponent>,
      private _fb: FormBuilder,
      private _afs: FirebaseService,
      private _us: UserService,
    ) {}

  ngOnInit() {
    this._us.getUser().subscribe(user => this.user = user);
    this.form = this._fb.group({
      url: ['', Validators.required],
      description: ['', Validators.required],
      title: ['', Validators.required]
    });
  }

  createLink(){
    if(this.form.valid && this.user && this.user.isAuth() ){
        this._afs.putLink(this.form.value, `links/${this.user.uid}`, () => {
          this.dialogRef.close({state: true, data: this.form.value});
        });
        

    }else{
      this.dialogRef.close({state: false, data: false});
    }
    
  }

  cancelCreation(){
    this.dialogRef.close({state: false, data: {}});
  }
}
