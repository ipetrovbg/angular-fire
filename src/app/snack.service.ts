import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SnackService {

  constructor(private snackBar: MdSnackBar) { }

  public snack(message: string, classes: Array<string>, action: any): Observable<any> {
    return this.snackBar.open(message, action, {
      duration: 10000,
      extraClasses: classes
    }).onAction();
  }

}
