import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(text: string, limit: number = 20): string {
    if (!text) return '';
    const ellipsis = '...';
    const adjustedLimit = limit - ellipsis.length;
    return text.length > limit
      ? text.slice(0, limit - ellipsis.length) + ellipsis
      : text;
  }
}
