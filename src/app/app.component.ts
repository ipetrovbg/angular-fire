import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgRedux, select, DevToolsExtension } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { CounterActions } from './actions';
import { AppState, INITIAL_STATE, rootReducer } from './store';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  @select() readonly counter$: Observable<number>;
  constructor(
    ngRedux: NgRedux<AppState>,
    devTools: DevToolsExtension,
    private actions: CounterActions
  ) {
    ngRedux.configureStore(
      rootReducer,
      INITIAL_STATE,
      null,
      devTools.isEnabled() ? [ devTools.enhancer() ] : []
    );
  }
  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }
}
