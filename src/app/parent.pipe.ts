import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({
    name: 'parent'
})
export class ParentPipe implements PipeTransform {
  transform(item: any , parent?: any): any {
  	let result:any = [];
  	//let result=[];
  	let j=0;
  	for(let i in item){
  		if(item[i].parent==parent){
  			result[j]=item[i];
  			j++;
  		}
  	}
    return result;
  }
}