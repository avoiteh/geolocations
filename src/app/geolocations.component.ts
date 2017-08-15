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
  let newNodes=this.filterTree(this.pointService.getData(), this.pointService.Search);
  console.log(newNodes);
  this.elementRef.nativeElement.innerHTML = this.drawTree(newNodes);
 }

 drawTree(nodes){
 	let html : string = '';
 	//втыкаем временный костыль фильтра
 	//let Search : string = '';
 	let subHtml='';
 	if(typeof nodes === "object" && nodes.length > 0){
    let inner_html='';
 	 	for(let i in nodes){
 	 		subHtml = this.drawTree(nodes[i].nodes);

 	 			inner_html += '<li>';// class="well well-sm"
        if(subHtml!=''){
          inner_html+='<a class="btn btn-success btn-xs"><span class="glyphicon '+(nodes[i].collapsed ? 'glyphicon-chevron-right':'glyphicon-chevron-down')+'" treetype="collapse" nodeId="'+nodes[i].id+'"></span></a>';
        }
        inner_html += '<span treetype="check" nodeId="'+nodes[i].id+'" class="glyphicon '+(nodes[i].check ? 'glyphicon-check':'glyphicon-unchecked')+' " style="font-size:20px;"></span>';
        inner_html += nodes[i].text+'</li>';
        if(!nodes[i].collapsed){
 	 				inner_html += subHtml;
 	 			}

 	 	}
    if(inner_html != ''){
      html+='<ul style="list-style-type: none;">'+inner_html+'</ul>';
    }
 	}
 	return html;
 }


 filterTree(nodes, Search){
  let newNodes=[];
  let j=0;
  for(let i in nodes){
    let items=this.filterTree(nodes[i].nodes, Search);
    if(items.length > 0 || nodes[i].text.toLowerCase().indexOf(Search.toLowerCase()) > -1 ){
      newNodes[j]={"id":nodes[i].id, "text":nodes[i].text,"check":nodes[i].check,"collapsed":nodes[i].collapsed,"nodes":items};
      j++;
    }
  }
  return newNodes;
 }
}