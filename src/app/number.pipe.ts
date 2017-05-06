import { Pipe, PipeTransform } from '@angular/core';
import { UtilService } from 'app/core/util.service';

@Pipe({
  name: 'number'
})
export class NumberPipe implements PipeTransform {
  constructor(private util: UtilService) {}
  transform(number: number): any {
    if ( number && typeof number === 'number') {
      return this.util.numberWithCommas(number);
    } else {
      return number;
    }
  }
}
