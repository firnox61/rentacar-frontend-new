import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'carlist'
})
export class CarlistPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
