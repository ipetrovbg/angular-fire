import { Component, OnInit, Input } from '@angular/core';
import { UtilService } from '../../core/util.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {
  public loading$: Observable<boolean>;
  constructor(private util: UtilService) {
    this.loading$ = util.getProgressState$();
  }
}
