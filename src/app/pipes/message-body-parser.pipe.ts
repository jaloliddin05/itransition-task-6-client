import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'messageBodyParser',
})
export class MessageBodyParserPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    value = value.replaceAll('\n', '<br>');
    return value;
  }
}