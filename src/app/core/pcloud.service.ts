import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class PcloudService extends BaseService {

  /**
   *
   * @param id
   * @param auth
   * @returns {Observable<R>}
   */
  public listFolder(id: number, auth: string) {
    return this.http.get(`https://api.pcloud.com/listfolder?auth=${auth}&folderid=${id}`)
      .map(data => data.json())
      .map(data => data.metadata.contents);
  }

  /**
   *
   * @param email
   * @param password
   */
  public getUser({email, password}: {email: string, password: string}) {
    return this.http
      .get(`https://api.pcloud.com/userinfo?getauth=1&username=${email}&password=${password}`)
      .map(data => data.json());
  }

  /**
   * can be combined with firebase pCloud auth
   * @param auth
   * @returns {Observable<R>}
   */
  public getUserByAuth(auth: string): Observable<any> {
    return this.http
      .get(`https://api.pcloud.com/userinfo?auth=${auth}`)
      .map(data => data.json());
  }

}
