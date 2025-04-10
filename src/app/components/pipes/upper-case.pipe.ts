import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customUpperCase',
  standalone:true,
  pure:true,
})
export class СustomUpperCasePipe implements PipeTransform {
  transform(text: string): string {
    return text.toUpperCase();
  }
}
