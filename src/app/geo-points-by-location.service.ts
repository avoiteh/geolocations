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
        this.data = [{"id": "1","text": "Parent 1","check": true,"nodes": [
  {"id": "2","text": "Child 1","check": false,"collapsed": false,"nodes": [
    {"id": "3","text": "Grandchild 1","check": false,"collapsed": true},
    {"id": "4","text": "Grandchild 2","check": true,"collapsed": true}
  ]},
  {"id": "5","text": "Child 2","check": false,"collapsed": true}
]},
{"id": "6","text": "Parent 2","check": false,"collapsed": true},
{"id": "7","text": "Parent 3","check": false,"collapsed": true},
{"id": "8","text": "Parent 4","check": false,"collapsed": true},
{"id": "9","text": "Parent 5","check": false ,"collapsed": true}];
    }
    getData(): any {//geoPointsByLocation[]
        return this.data;
    }
    addData(){
       // this.data.push(new geoPointsByLocation(id,text,check,));
    }
    getNodeById(id:number):any{
        this.treeTraversal(id, this.data);
        return this.nodeById;
    }
    treeTraversal(id: number, nodes: any){
        for(let i in nodes){
            if(nodes[i].id == id){
                this.nodeById = nodes[i];
            }else{
                this.treeTraversal(id, nodes[i].nodes);
            }
        }
    }

    toggleCheck(id:number){
        let check = this.getNodeById(id).check;
        this.nodeById.check = !check;
    }
    toggleCollapsed(id:number){
        let collapsed = this.getNodeById(id).collapsed;
        this.nodeById.collapsed = !collapsed;
        console.log(this.nodeById);
    }
}