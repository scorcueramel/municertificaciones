import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscadorHu',
})
export class BuscadorHuPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];

    if (!searchText) return items;

    return this.searchItems(items, searchText);
  }

  private searchItems(items: any[], searchText: any): any[] {
    let results: any[] = [];

    items.forEach(function(i){

      if(i.VCHTCUDESCRIPCION != undefined){
        if(
          i.VCHCURDESCRIPCION1.includes(searchText) ||
          i.VCHTCUDESCRIPCION.includes(searchText)
          ){
            results.push(i);
          }
        }
    });
    return results;
  }
}
