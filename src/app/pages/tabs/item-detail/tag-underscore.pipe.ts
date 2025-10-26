import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tagUnderscore',
  standalone: true
})
export class TagUnderscorePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return (value ?? '').replace(/_/g, ' ');
  }
}
