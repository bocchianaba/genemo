import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-timezone';

@Pipe({
  name: 'camerounDate'
})
export class CamerounDatePipe implements PipeTransform {

  constructor() { }

  transform(value: any, format: string): string {
    const camerounTime = moment.tz(value, 'Africa/Douala');
    const formattedDateTime = camerounTime.locale('fr').format(format);
    return formattedDateTime;
  }

}
