import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroPorNombre'
})
export class FiltroPorNombrePipe implements PipeTransform {
  transform(categorias: any[], texto: string): any[] {
    if (!texto) return categorias;
    texto = texto.toLowerCase();
    return categorias.filter(cat => cat.nombre.toLowerCase().includes(texto));
  }
}
