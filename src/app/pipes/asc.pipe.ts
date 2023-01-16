import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'asc'
})
export class AscPipe implements PipeTransform {

  transform(input: any, asc: string) {
    if (!input) return [];
    

    return input.sort(function(itemA:any, itemB:any) {
      if (itemA[asc].toLowerCase() > itemB[asc].toLowerCase()) {
        return 1;
      } 
      else if (itemA[asc].toLowerCase() < itemB[asc].toLowerCase()) {
        return -1;
      } else {
        return 0;
      }
    })
  }

}
