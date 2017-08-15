import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'attached'
})
export class AttachedPipe implements PipeTransform {
  transform(item: any): any {
  	let result:any = [];
  	//let result=[];
  	let j=0;
  	for(let i in item){
  		if(item[i].check){
  			result[j]=item[i];
  			j++;
  		}
  	}
    return result;
  }
}