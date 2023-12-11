import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscadorVias',
})
export class BuscadorViasPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];

    if (!searchText) return items;

    return this.searchItems(items, searchText);
  }

  private searchItems(items: any[], searchText: any): any[] {
    let results: any[] = [];

    items.forEach(function (i) {
      // if(i.VCHCURDESCRIPCION1 != undefined){
        if (
          i.CHRCURCODIGO.includes(searchText) ||
          i.VCHTCUDESCRIPCION.includes(searchText) ||
          i.VCHCURDESCRIPCION1.includes(searchText) ||
          i.VCHVIACODIGO.includes(searchText) ||
          i.VCHTVIDESCRIPCION.includes(searchText) ||
          i.VCHVIADESCRIPCION.includes(searchText)
          ) {
            results.push(i);
          }
      // }
    });
    return results;
  }
}
