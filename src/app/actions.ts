import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from './store';
import { User } from './user/user';

@Injectable()
export class CounterActions {
  static UPDATE_USER = 'UPDATE_USER';
  static SET_LINKS = 'SET_LINKS';
  static LINK_RESULTS = 'LINK_RESULTS';
  static REQUEST_FOR_LINKS = 'REQUEST_FOR_LINKS';
  static LOADING_LINKS = 'LOADING_LINKS';

  constructor(private ngRedux: NgRedux<AppState>) {}

  setLink(links) {
    this.ngRedux.dispatch({ type: CounterActions.SET_LINKS, payload: { links: links } });
  }

  setLinksResult(links) {
    this.ngRedux.dispatch({ type: CounterActions.LINK_RESULTS, payload: { links: links } });
  }

  updateUser(user: User) {
    this.ngRedux.dispatch({ type: CounterActions.UPDATE_USER, payload: { user: user } });
  }

  requestForLinks(state: boolean) {
    this.ngRedux.dispatch({ type: CounterActions.REQUEST_FOR_LINKS, payload: state });
  }

  loadingLinks(state: boolean) {
    this.ngRedux.dispatch({ type: CounterActions.LOADING_LINKS, payload: state });
  }
}
