import { Pipe, PipeTransform } from '@angular/core';
import { DictData } from '../../model/common.model';

@Pipe({
  name: 'dictionaryPipe'
})
export class DictionaryPipe implements PipeTransform {

  transform(value: number, dict: DictData[]): string {
    let label = '';
    if (dict.length) {
      const foundRecord = dict.find(item => item.id === value);
      label = foundRecord ? foundRecord.label : '';
    }
    return label;
    }
}
