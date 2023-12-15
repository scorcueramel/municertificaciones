import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscadorCertificaciones'
})
export class BuscadorCertificacionesPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];

    if (!searchText) return items;

    return this.searchItems(items, searchText);
  }

  private searchItems(items: any[], searchText: any): any[] {
    let results: any[] = [];

    items.forEach(function (i) {
      // console.log(i.VCHNUMEXP);
      if (
        i.CHRCERANIO.includes(searchText) ||
        i.DATCERFECHA.includes(searchText) ||
        i.VCHCERNUMERO.includes(searchText) ||
        i.VCHTIPOHU.includes(searchText) ||
        i.VCHNOMBREHU.includes(searchText) ||
        i.VCHCERSOLICITANTE.includes(searchText) ||
        i.VCHLOTDESLTHU.includes(searchText) ||
        i.VCHNUMEXP.includes(searchText)
      ) {
        results.push(i);
      }
    });

    return results;
  }

}
