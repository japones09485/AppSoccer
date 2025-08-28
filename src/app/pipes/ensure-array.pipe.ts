import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ensureArray',
  standalone: true
})
export class EnsureArrayPipe implements PipeTransform {
  transform(value: any): any[] {
    return Array.isArray(value) ? value : [];
  }
}
