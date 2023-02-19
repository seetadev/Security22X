import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
@Injectable()
export class Capitalize {
  /*
    Takes a value and capitalize the first letter.
   */
  transform(value) {
    value = value + ''; // make sure it's a string
    value = value.toLowerCase();
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
