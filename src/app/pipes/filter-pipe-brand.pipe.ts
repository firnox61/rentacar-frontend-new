import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../models/brand';

@Pipe({
  name: 'filterPipeBrand'
})
export class FilterPipeBrandPipe implements PipeTransform {

  transform(value: Brand[], filterBrandText: string): Brand[] {
    filterBrandText=filterBrandText?filterBrandText.toLocaleLowerCase():"";


    return filterBrandText?value.filter((b:Brand)=>b.brandName.toLocaleLowerCase().indexOf(filterBrandText)!==-1):value;
  }

}