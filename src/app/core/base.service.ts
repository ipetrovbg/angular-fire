import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class BaseService {

  constructor(protected http: Http ) { }

}
