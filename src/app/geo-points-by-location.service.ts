import {geoPointsByLocation} from './geo-points-by-location';
import { Injectable } from '@angular/core';
@Injectable()
export class PointService{
 
    private data: any;
    private nodeById: any;

    geolocationTitle = 'Кислосвищенск';
    geolocationIsDefault = true;
    Search='';
    flagChange=false;

    constructor(){
        this.data = [
            {"id": "1","text": "Parent 1",      "check": true, "collapsed": false, "expand":true, "path":"Parent 1",  "parent":"0"},
            {"id": "2","text": "Child 1",       "check": false,"collapsed": false, "expand":true, "path":"Parent 1 / Child 1",  "parent":"1"},
            {"id": "3","text": "Grandchild 1",  "check": false,"collapsed": true,  "expand":false, "path":"Parent 1 / Child 1 / Grandchild 1", "parent":"2"},
            {"id": "4","text": "Grandchild 2",  "check": true, "collapsed": true,  "expand":false, "path":"Parent 1 / Child 1 / Grandchild 2", "parent":"2"},
            {"id": "5","text": "Child 2",       "check": false,"collapsed": true,  "expand":false, "path":"Parent 1 / Child 2", "parent":"1"},
            {"id": "6","text": "Parent 2",      "check": false,"collapsed": true,  "expand":false, "path":"Parent 2", "parent":"0"},
            {"id": "7","text": "Parent 3",      "check": false,"collapsed": true,  "expand":false, "path":"Parent 3", "parent":"0"},
            {"id": "8","text": "Parent 4",      "check": false,"collapsed": true,  "expand":false, "path":"Parent 4", "parent":"0"},
            {"id": "9","text": "Parent 5",      "check": false,"collapsed": true,  "expand":false, "path":"Parent 5", "parent":"0"}
        ];
    }
    getData(): any {//geoPointsByLocation[]
        return this.data;
    }

    toggleCheck(id:number){
        for(let i in this.data){
            if(this.data[i].id == id){
                this.data[i].check = !this.data[i].check;
            }
        }
    }
    toggleCollapsed(id:number){
        for(let i in this.data){
            if(this.data[i].id == id){
                this.data[i].collapsed = !this.data[i].collapsed;
            }
        }
    }
}