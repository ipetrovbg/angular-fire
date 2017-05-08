import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Rx';

import * as _ from 'lodash';

@Injectable()
export class FirebaseService {
  constructor(private _af: AngularFireDatabase) {}

  /**
   * basic db method
   * @param path
   * @returns {Observable<any>}
   */
  public database(path: string): Observable<any> {
    return this._af.list(path);
  }

  /**
   * searching links by string {q} and path {/links/some-uid}
   * @param q
   * @param path
   * @returns {Observable<R>}
   */
  public searchLinks( q: string, path: string ): Observable<any> {
    return this._af
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
    const fireLinksList = this._af.list(path);
    if (fireLinksList) {
      fireLinksList.push(singleLink);
      if ( typeof cb === 'function' ) {
        cb();
      }
    }
  }

  /**
   *
   * put spent money
   */
  public putSpentMoney = ( money: number, path: string ) => {
    return firebase.database().ref(path).set(money);
    // const firePocketMoney = this._af.list(path);
    // firePocketMoney.push(money);
  }

  /**
   * get auth for pCloud by uid
   * auth.auth
   * @param uid
   * @returns {Observable<any>}
   */
  public getPcloudAuth(uid: string): Observable<any> {
    return this._af.list(`pcloud/${ uid }`);
  }

  /**
   * update pCloud auth by uid
   * @param auth
   * @param uid
   * @returns {Observable<any>}
   */
  public updatePcloudAuth(auth: string, uid: string): Observable<any> {
    const fbPclodRef = this._af;
    fbPclodRef.list(`pcloud`, { preserveSnapshot: true }).update(uid, { auth: auth, refresh: new Date().getTime() });
    return fbPclodRef.list(`pcloud/${ uid }`);
  }

}
