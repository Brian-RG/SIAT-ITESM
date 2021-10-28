import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'module'
})
export class ModuloPipe implements PipeTransform {

  transform(modules: Array<any>) {
    return modules.map(
      (mod) => {
        return mod.name;
      }
    );
  }

}
