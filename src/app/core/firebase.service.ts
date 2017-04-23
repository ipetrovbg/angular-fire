import { Injectable } from '@angular/core';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Rx';

import * as _ from 'lodash';

@Injectable()
export class FirebaseService {

  constructor(private _af: AngularFire) { }

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
              let newData = [];
              let search = _.toLower(q);
            _.forEach(terms, item => {
              if( item.title && item.title.length > 1 && item.description && item.url ){
                let title =  _.toLower(item.title).indexOf(search);
                let description = _.toLower(item.description).indexOf(search);
                let url = _.toLower(item.url).indexOf(search);

                  if ( title > -1 ) newData.push( item )
                  else if ( description > -1 ) newData.push( item )
                  else if ( url > -1 ) newData.push( item )
              }
            });
              return newData;
            });
  }

  putLink(singleLink, path: string, cb) {
    let fireLinksList = this._af.database.list(path);
    if(fireLinksList){
      fireLinksList.push(singleLink);
      if( typeof cb === 'function' ){
        cb();
      }
    }
    
  }

}
