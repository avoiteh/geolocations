import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({
    name: 'parent'
})
export class ParentPipe implements PipeTransform {
  transform(item: any , parent?: any): any {
  	let result:any = [];
  	console.log(parent);
  	let j=0;
  	for(let i in item){
      if(item[i].parent == parent){
        result[result.length]=item[i];
      }
  	}
    return result;
  }
}