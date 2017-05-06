import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Rx';

import * as _ from 'lodash';

@Injectable()
export class FirebaseService {
  constructor(private _af: AngularFire) {}

  /**
   * basic db method
   * @param path
   * @returns {FirebaseListObservable<any[]>}
   */
  public database(path: string): FirebaseListObservable<any> {
    return this._af.database.list(path);
  }

  /**
   * searching links by string {q} and path {/links/some-uid}
   * @param q
   * @param path
   * @returns {Observable<R>}
   */
  public searchLinks( q: string, path: string ) {
    return this._af.database
            .list(path, {
              query: {
                orderByChild: 'title'
              }
            })
            .catch(error => {
              return Observable.throw(new Error(error));
            })
            .map(terms => {
              const newData = [];
              const search = _.toLower(q);
            _.forEach(terms, item => {
              if ( item.title && item.title.length > 1 && item.description && item.url ) {
                const title =  _.toLower(item.title).indexOf(search);
                const description = _.toLower(item.description).indexOf(search);
                const url = _.toLower(item.url).indexOf(search);

                  if ( title > -1 ) {
                    newData.push( item );
                  } else if ( description > -1 ) {
                    newData.push( item );
                  } else if ( url > -1 ) {
                    newData.push( item );
                  }
              }
            });
              return newData;
            });
  }

  /**
   * put new link in db
   * @param singleLink
   * @param path {links/uid}
   * @param cb (callback after put new link)
   */
  public putLink(singleLink, path: string, cb) {
    const fireLinksList = this._af.database.list(path);
    if (fireLinksList) {
      fireLinksList.push(singleLink);
      if ( typeof cb === 'function' ) {
        cb();
      }
    }
  }

  /**
   * get auth for pCloud by uid
   * auth.auth
   * @param uid
   * @returns {FirebaseListObservable<any[]>}
   */
  public getPcloudAuth(uid: string): FirebaseListObservable<any> {
    return this._af.database.list(`pcloud/${ uid }`);
  }

  /**
   * update pCloud auth by uid
   * @param auth
   * @param uid
   * @returns {FirebaseListObservable<any[]>}
   */
  public updatePcloudAuth(auth: string, uid: string): FirebaseListObservable<any> {
    const fbPclodRef = this._af.database;
    fbPclodRef.list(`pcloud`, { preserveSnapshot: true }).update(uid, { auth: auth, refresh: new Date().getTime() });
    return fbPclodRef.list(`pcloud/${ uid }`);
  }

}
