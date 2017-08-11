import { Component } from '@angular/core';
import { Directive, Input, HostListener, TemplateRef, ViewContainerRef, Renderer, ElementRef, SimpleChanges, OnChanges } from '@angular/core';
import { PointService } from './geo-points-by-location.service';

@Component({
	selector: 'attached-geo-objects',
	template: `<div></div>`
})

export class attachedGeoObjects implements OnChanges {
  private elementRef: ElementRef;
  private pointService: PointService;

  constructor(private _elementRef: ElementRef, 
              private _renderer: Renderer,
              private _pointService: PointService) {
    this.pointService = _pointService;
    this.elementRef = _elementRef;
  }

  @Input() flagChange: boolean;

 ngOnChanges(changes: SimpleChanges) {
    this.refresh();
 }

 refresh(){
  this.elementRef.nativeElement.innerHTML = this.drawList(this.pointService.getData(), '');
 }

 drawList(nodes, path){
  let html : string = '';
 	//втыкаем временный костыль фильтра
 	//let Search : string = '';
 	if(typeof nodes === "object" && nodes.length > 0){
 	 	for(let i in nodes){
 	 		if(nodes[i].check){
 	 			html += '<div class="row"><div class="col-md-11 well"><h4>'+nodes[i].text+'</h4><small>'+path+ (path=='' ? '' : ' / ') + nodes[i].text+'</small></div><div class="col-md-1"></div></div>';
 	 		}
        	html += this.drawList(nodes[i].nodes, path+(path=='' ? '' : ' / ')+nodes[i].text);
 	 	}
 	}
 	return html;
 }
}