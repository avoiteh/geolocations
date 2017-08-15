import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { PointService } from './geo-points-by-location.service';

@Component({
	selector: 'attached-geo-objects',
	template: `<div class="row" *ngFor="let node of pointService.getData() | attached">
  <div class="col-md-11 well">
    <h4>{{node.text}}</h4><small>{{node.path}}</small>
  </div>
  <div class="col-md-1"></div>
  </div>`
})

export class attachedGeoObjects implements OnChanges {
  private pointService: PointService;
  Nodes: any;

  constructor(private _pointService: PointService) {
    this.pointService = _pointService;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    //this.refresh();
 }
}