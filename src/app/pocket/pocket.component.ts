import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SnackService } from 'app/snack.service';
import { PocketService } from 'app/core/pocket.service';
import { Subscription } from 'rxjs/Subscription';
import { UtilService } from '../core/util.service';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-pocket',
  templateUrl: './pocket.component.html',
  styleUrls: ['./pocket.component.css']
})
export class PocketComponent implements OnInit, OnDestroy {
  public daily: number;
  public date: Date = new Date();
  public logs = {year: [], month: [], day: 0, humanizeMonth: ''};
  private subscription: Subscription = new Subscription();

  constructor(
    private snack: SnackService,
    private router: Router,
    private pocket: PocketService,
    private util: UtilService,
  ) { }


  ngOnInit() {
    this.util.setProgressState(true);
    this.subscription.add(
      this.pocket.getSalaryAndDailyMoney().subscribe(data => {
      this.daily = data.daily;
      setTimeout(() => {
        this.util.setProgressState(false);
      }, 0);

    },
    error => {
      this.snack.snack('Error', ['error'], null);
      this.router.navigate(['home']);
      this.util.setProgressState(false);
    }));
    this.getDaily(this.date);
  }

  ngOnDestroy() {
    this.util.setProgressState(false);
    this.subscription.unsubscribe();
  }

  onSelect(event) {
    this.getDaily(event);
  }

  private getDaily(date) {
    this.pocket.getDailyLogs(date).subscribe(data => {
      if ( typeof data.year.length === 'undefined' ) {
        let counter = 0;
        this.logs = {year: [], month: [], day: 0, humanizeMonth: ''};
        this.logs.day = data.day;
        _.each(data.year, (year, key) => {
          this.logs.year.push({month: key, data: []});
          _.each(year, (month, k) => {
            if (k !== 'salary') {
              this.logs.year[counter].data.push({key: k, month});
            }
          });
          counter++;
        });
        _.each(data.month, (month, key) => {
          if (key !== 'salary') {
            this.logs.month.push({key, month, humanMonth: moment(key).format('MMM')});
          }
        });
        this.logs.humanizeMonth = data.humanizeMonth;
        console.log(data.humanizeMonth);
      }
    });
  }

}
