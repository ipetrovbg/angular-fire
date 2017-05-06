import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FirebaseService } from 'app/core/firebase.service';
import { UtilService } from 'app/core/util.service';
import { UserService } from 'app/user/user.service';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class PocketService {
  constructor(
    private _afs: FirebaseService,
    private util: UtilService,
    private _us: UserService,
  ) { }

  public getSalaryAndDailyMoney(): Observable<any> {
    const data$ = new BehaviorSubject({daily: 0, total: 0});
    this._us.getUser().subscribe(user => {
      const year = moment(new Date()).format('YYYY');
      const month = moment(new Date()).format('MM');
      const day = moment().format('D');
      const lastDaysToNewSalary = +moment().endOf('month').format('D') - (+day) + 4;
      const salary$ = this._afs.database(`pocket/${user.uid}/${year}/${month}/salary`);
      const monthlyCost$ = this._afs.database(`pocket/${user.uid}/${year}/${month}`);
      Observable.combineLatest([salary$, monthlyCost$])
        .map(([salary$, monthlyCost$]) => [{salary$: salary$, monthlyCost$: monthlyCost$}])
        .map(all => all[0])
        .subscribe(all => {
            const salary          = all.salary$[0] ? all.salary$[0] : all.salary$;
            const monthlyCostData = all.monthlyCost$;
            let monthlyCost       = 0;
            monthlyCostData.forEach((day) => {
              if ( day.$value ) {
                monthlyCost += day.$value;
              }
            });
            if (salary.$value) {
              data$.next({ daily: this.util.round((salary.$value - monthlyCost) / lastDaysToNewSalary, 2), total: salary.$value - monthlyCost});
            }
          });
    });
    return data$;
  }

}
