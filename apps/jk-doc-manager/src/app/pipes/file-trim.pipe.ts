import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fileTrim', standalone: true })
export class FileTrimPipe implements PipeTransform {
  transform(value: string): string {
    const parts = value.split('/');
    return parts[parts.length - 1];
  }
}
