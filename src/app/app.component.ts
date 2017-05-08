import { Component, ViewEncapsulation } from '@angular/core';
import { NgRedux, DevToolsExtension } from '@angular-redux/store';
import { AppState, INITIAL_STATE, rootReducer } from './store';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  constructor(
    ngRedux: NgRedux<AppState>,
    devTools: DevToolsExtension,
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
