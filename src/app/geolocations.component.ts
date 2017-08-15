import { Component } from '@angular/core';
import { Directive, Input, HostListener, SimpleChanges, OnChanges } from '@angular/core';
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
	template: `<ul>
  <li *ngFor="let node of pointService.getData() | parent: parent">
    <a class="btn btn-success btn-xs" *ngIf="node.expand">
      <span class="glyphicon" [ngClass]="{
        'glyphicon-chevron-right': node.collapsed,
        'glyphicon-chevron-down': !node.collapsed
      }" (click)="onClickCollapse(node.id)"></span>
    </a>
    <span treetype="check" nodeId="node.id" class="glyphicon" [ngClass]="{
      'glyphicon-check': node.check,
      'glyphicon-unchecked': !node.check
    }" style="font-size:20px;"
    (click)="onClickCheck(node.id)"></span>
    {{node.text}}
    <geo-points-tree-view *ngIf="!node.collapsed" [Search]="pointService.Search" [parent]="node.id"></geo-points-tree-view>
  </li>
</ul>`
})

export class geoPointsTreeViewDirective implements OnChanges {//.tick()
  private pointService: PointService;

  constructor(private _pointService: PointService) {
    this.pointService = _pointService;
  }

  @Input() Search: string;
  @Input() parent: string;

  // @Input()
  //   set Search(Search:string){
  //     this.Search = Search;
  //   }
 ngOnChanges(changes: SimpleChanges) {
  console.log(changes.Search.currentValue);
 }

 @HostListener('click', ['$event.target'])
 onClickCollapse(id: number){
  this.pointService.toggleCollapsed(id);
 }
 onClickCheck(id: number){
  this.pointService.toggleCheck(id);
 }

 // refresh(){
 //  // this.elementRef.nativeElement.innerHTML = this.drawTree(this.pointService.getData(), parent);
 //  this.Nodes = this.pointService.getData();
 // }
}