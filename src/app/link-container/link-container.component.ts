import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { UserService } from 'app/user/user.service';
import { FirebaseService } from 'app/core/firebase.service';
import { CounterActions } from 'app/actions';

@Component({
  selector: 'app-link-container',
  templateUrl: './link-container.component.html',
  styleUrls: ['./link-container.component.css']
})
export class LinkContainerComponent implements OnInit {
  @select() public readonly links$: Observable<Array<any>>;
  @select() public readonly loadingLinks$: Observable<boolean>;
  constructor(
    private _us: UserService,
    private fb: FirebaseService,
    private actions: CounterActions
  ) { }

  ngOnInit() {
    this._us.getUser().subscribe(user => {
      if ( user && user.uid ) {
        this.links$.subscribe(links => {
          if (!links.length) {
            this.actions.loadingLinks(true);
            this.fb.database(`links/${user.uid}`).subscribe(snap => {
              this.actions.setLink(snap);
                this.actions.loadingLinks(false);
              },
            () => {
              this.actions.loadingLinks(false);
            });
          }
        });
      }
    });
  }

}
