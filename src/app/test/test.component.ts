import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  @select() readonly user$: Observable<number>;
  @select() readonly counter$: Observable<number>;
  constructor() { }

  ngOnInit() {
    this.user$.subscribe(user => {
      console.log(user);
    });
    // this.counter$.subscribe(count => console.log(count));
  }

}
