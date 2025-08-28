import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true, // IMPORTANTE
  name: 'filtroPorNombre'
})
export class FiltroPorNombrePipe implements PipeTransform {
  transform(equipos: any[], filtro: string): any[] {
    if (!filtro) return equipos;
    return equipos.filter(e => e.nombre.toLowerCase().includes(filtro.toLowerCase()));
  }
}
