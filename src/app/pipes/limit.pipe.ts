import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limit',
  standalone: true
})
export class LimitPipe implements PipeTransform {

  transform<T>(array: T[], limit: number): T[] {
    if (!Array.isArray(array)) {
      throw new Error('LimitPipe: first args must be an array');
    }

    return array.slice(0, limit);
  }

}
