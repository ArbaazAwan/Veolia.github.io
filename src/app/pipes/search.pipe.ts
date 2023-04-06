import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value)
    return null;
    if(!args)
    return value;

    const searchTerms  = args.toLowerCase().split(' ');
    return value.filter((item:any)=>{
      const itemString = JSON.stringify(item).toLowerCase();
      return searchTerms.every((term:string) => itemString.includes(term));
    });
  }

}
