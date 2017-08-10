import { Component } from '@angular/core';
import { Directive, Input, HostListener, TemplateRef, ViewContainerRef, Renderer, ElementRef, SimpleChanges, OnChanges } from '@angular/core';
import { PointService } from './geo-points-by-location.service';

@Component({
  selector: 'geolocations',
  templateUrl: './geolocations.component.html',
  styleUrls: ['./geolocations.component.css'],
  providers: [PointService]
})
export class GeolocationsComponent {

  private pointService: PointService;
  constructor(private _pointService: PointService) { 
  	this.pointService = _pointService;
  }

  changeSearch(Search){
  	this.pointService.Search = Search;
  }
}

@Component({
	selector: 'geo-points-tree-view',
	template: `<div></div>`
})
export class geoPointsTreeViewDirective implements OnChanges {
  private elementRef: ElementRef;
  private pointService: PointService;

  constructor(private _elementRef: ElementRef, 
              private _renderer: Renderer,
              private _pointService: PointService) {
    this.pointService = _pointService;
    this.elementRef = _elementRef;
  }

  @Input() Search: string;

 ngOnChanges(changes: SimpleChanges) {
    this.refresh();
 }

 @HostListener('click', ['$event.target'])
 onClick(event) {
    if(event.getAttribute("treetype")=='collapse'){
      this.pointService.toggleCollapsed(event.getAttribute("nodeid"));
    }
    if(event.getAttribute("treetype")=='check'){
      this.pointService.toggleCheck(event.getAttribute("nodeid"));
      this.pointService.flagChange = !this.pointService.flagChange;
    }
    this.refresh();
 }

 refresh(){
  this.elementRef.nativeElement.innerHTML = this.drawTree(this.pointService.getData());
 }

 drawTree(nodes){
 	let html : string = '';
 	//втыкаем временный костыль фильтра
 	//let Search : string = '';
 	let subHtml='';
 	if(typeof nodes === "object" && nodes.length > 0){
 	 	html+='<ul>';
 	 	for(let i in nodes){
 	 		subHtml = this.drawTree(nodes[i].nodes);
 	 		if(nodes[i].text.toLowerCase().indexOf(this.pointService.Search.toLowerCase()) > -1 || 
 	 			subHtml != ''){
 	 			html += '<li>';
        if(subHtml!=''){
          html+='<a class="btn btn-success btn-xs"><span class="glyphicon '+(nodes[i].collapsed ? 'glyphicon-chevron-right':'glyphicon-chevron-down')+'" treetype="collapse" nodeId="'+nodes[i].id+'"></span></a>';
        }
        html += '<input type="checkbox" treetype="check" nodeId="'+nodes[i].id+'" '+(nodes[i].check ? 'checked':'')+'>'+nodes[i].text+'</li>';
        if(!nodes[i].collapsed){
 	 				html += subHtml;
 	 			}
 	 		}
 	 	}
 	 	html+='</ul>';
 	}
 	return html;
 }
}