import { Pipe, PipeTransform } from '@angular/core';
import { Color } from '../models/color';

@Pipe({
  name: 'filterPipeColor'
})
export class FilterPipeColorPipe implements PipeTransform {

  transform(value: Color[], filterColorText:string): Color[] {
    filterColorText=filterColorText?filterColorText.toLocaleLowerCase():"";

    return filterColorText?value.filter((g:Color)=>g.colorName.toLocaleLowerCase().indexOf(filterColorText)!==-1):value;
  }

}
