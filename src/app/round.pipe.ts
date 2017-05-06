import { Pipe, PipeTransform } from '@angular/core';
import { UtilService } from 'app/core/util.service';

@Pipe({
  name: 'round'
})
export class RoundPipe implements PipeTransform {
  constructor(private util: UtilService) {}
  transform(number: number, precision: number): number {
    if ( number && typeof number === 'number') {
      return this.util.round(number, 0);
    } else {
      return number;
    }

  }

}
