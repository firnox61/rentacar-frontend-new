import { Pipe, PipeTransform } from '@angular/core';
import { CarDetail } from '../models/carDetail';

@Pipe({
  name: 'filterPipeCarlist'
})
export class FilterPipeCarlistPipe implements PipeTransform {

  transform(value: CarDetail[], filterCarDetailText: string): CarDetail[] {
    filterCarDetailText=filterCarDetailText?filterCarDetailText.toLocaleLowerCase():""
    return filterCarDetailText?value.filter((c:CarDetail)=>c.carName.toLocaleLowerCase().indexOf(filterCarDetailText)!==-1):value;
  }

}
