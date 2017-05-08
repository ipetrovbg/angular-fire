import { Action } from 'redux';
import { CounterActions } from './actions';

export interface ExtendedAction extends Action {
  type: any;
  payload: any;
}
export interface AppState {
  counter: number;
  user: {
    displayName: string,
    photoURL: string,
    uid: string
  };
  searchLinkResults: Array<any>;
  links: Array<any>;
  requestForLinks: boolean;
  loadingLinks: boolean;
}

export const INITIAL_STATE: AppState = {
  counter: 0,
  user: {
    displayName: undefined,
    photoURL: undefined,
    uid: undefined
  },
  searchLinkResults: [],
  links: [],
  requestForLinks: false,
  loadingLinks: false,
};

export function rootReducer(state: AppState, action: ExtendedAction): AppState {
  switch (action.type) {
    case CounterActions.INCREMENT: return Object.assign(state, {}, state.counter + 1);
    case CounterActions.DECREMENT: return Object.assign(state, {}, state.counter - 1);
    case CounterActions.LOADING_LINKS: {
      state.loadingLinks = action.payload;
      return Object.assign({}, state);
    }
    case CounterActions.REQUEST_FOR_LINKS: {
      state.requestForLinks = action.payload;
      return Object.assign({}, state );
    }
    case CounterActions.UPDATE_USER: {
      state.user = action.payload.user;
      return Object.assign({}, state);
    }
    case CounterActions.LINK_RESULTS: {
      state.searchLinkResults = action.payload.links;
      return Object.assign({}, state);
    }
    case CounterActions.SET_LINKS: {
      state.links = action.payload.links;
      return Object.assign({}, state);
    }
    default: return state;
  }
}
