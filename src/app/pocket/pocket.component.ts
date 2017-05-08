import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SnackService } from 'app/snack.service';
import { PocketService } from 'app/core/pocket.service';
import { Subscription } from 'rxjs/Subscription';
import { UtilService } from '../core/util.service';

@Component({
  selector: 'app-pocket',
  templateUrl: './pocket.component.html',
  styleUrls: ['./pocket.component.css']
})
export class PocketComponent implements OnInit, OnDestroy {
  public daily: number;
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
  }

  ngOnDestroy() {
    this.util.setProgressState(false);
    this.subscription.unsubscribe();
  }

}
