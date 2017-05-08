import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UtilService {
  private state: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() { }

  /**
   * round to decimal number
   * @param number
   * @param precision
   */
  public round(number, precision): number {
    const factor = Math.pow(10, precision);
    const tempNumber = number * factor;
    const roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
  }

  /**
   *
   * @param number
   * @returns {number|string}
   */
  public numberWithCommas(number: number | string): string {
    number = number.toString();
    const pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(number))
      number = number.replace(pattern, '$1,$2');
    return number;
  }

  public setProgressState(state: boolean): void {
    this.state.next(state);
  }
  public getProgressState$(): Observable<boolean> {
   return this.state.asObservable();
  }

}
