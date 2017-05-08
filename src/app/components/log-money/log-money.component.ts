import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from '../../core/firebase.service';
import * as moment from 'moment';
import { UserService } from '../../user/user.service';
import { User } from 'app/user/user';
import { AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'app-log-money',
  templateUrl: './log-money.component.html',
  styleUrls: ['./log-money.component.css']
})
export class LogMoneyComponent implements OnInit {
  public form: FormGroup;
  public today: Date = new Date();
  public user: User;
  constructor(
    public dialogRef: MdDialogRef<LogMoneyComponent>,
    private _fb: FormBuilder,
    private _afs: FirebaseService,
    private _us: UserService,
  ) { }

  ngOnInit() {
    this._us.getUser().subscribe(user => this.user = user);
    this.form = this._fb.group({
      date: [this.today],
      money: ['0', Validators.required]
    });
  }

  onSelect = event => this.form.patchValue({ date: event});

  save = () => {
    if ( this.form.value ) {
      const year = moment().format('YYYY');
      const month = moment().format('MM');
      const day = moment(this.today).format('DD');
      const path = `pocket/${this.user.uid}/${year}/${month}`;
      let count = 0;
      const subscription = this._afs.database(path)
        .subscribe(data => {

          data.forEach((v) => {
            console.log(count);
            if ( v.$key === day) {
              const newMoney = v.$value + (+this.form.controls.money.value);
              this._afs.putSpentMoney(newMoney, `${path}/${day}`).then(result => {
                this.dialogRef.close(true);
                subscription.unsubscribe();
              });
            } else {
              if (count === 0) {
                this._afs.putSpentMoney(+this.form.controls.money.value, `${path}/${day}`).then(result => {
                  this.dialogRef.close(true);
                  subscription.unsubscribe();
                });
              }
              count++;
            }
          });
        });
    }
  }

  cancel = () => {
    this.dialogRef.close(false);
  }

}
