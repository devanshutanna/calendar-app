import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leftIndentLevel'
})
export class LeftIndentLevelPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
