import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SnackService } from 'app/snack.service';
import { PocketService } from 'app/core/pocket.service';
import { Subscription } from 'rxjs/Subscription';

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
    private pocket: PocketService
  ) { }


  ngOnInit() {
    this.subscription.add(
      this.pocket.getSalaryAndDailyMoney().subscribe(data => {
      this.daily = data.daily;
    },
    error => {
      this.snack.snack('Error', ['error'], null);
      this.router.navigate(['home']);
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
