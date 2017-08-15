import {geoPointsByLocation} from './geo-points-by-location';
import { Injectable } from '@angular/core';
@Injectable()
export class PointService{
 
    private data: any;
    private filteredData: any;
    private nodeById: any;

    geolocationTitle = 'Кислосвищенск';
    geolocationIsDefault = true;
    Search='';
    flagChange=false;

    constructor(){
        this.data = [
            {"id": "1","text": "Parent 1",      "check": true, "collapsed": false, "expand":true, "path":"Parent 1",  "parent":"0", "Searched":true},
            {"id": "2","text": "Child 1",       "check": false,"collapsed": false, "expand":true, "path":"Parent 1 / Child 1",  "parent":"1", "Searched":true},
            {"id": "3","text": "Grandchild 1",  "check": false,"collapsed": true,  "expand":false, "path":"Parent 1 / Child 1 / Grandchild 1", "parent":"2", "Searched":true},
            {"id": "4","text": "Grandchild 2",  "check": true, "collapsed": true,  "expand":false, "path":"Parent 1 / Child 1 / Grandchild 2", "parent":"2", "Searched":true},
            {"id": "5","text": "Child 2",       "check": false,"collapsed": true,  "expand":false, "path":"Parent 1 / Child 2", "parent":"1", "Searched":true},
            {"id": "6","text": "Parent 2",      "check": false,"collapsed": true,  "expand":false, "path":"Parent 2", "parent":"0", "Searched":true},
            {"id": "7","text": "Parent 3",      "check": false,"collapsed": true,  "expand":false, "path":"Parent 3", "parent":"0", "Searched":true},
            {"id": "8","text": "Parent 4",      "check": false,"collapsed": true,  "expand":false, "path":"Parent 4", "parent":"0", "Searched":true},
            {"id": "9","text": "Parent 5",      "check": false,"collapsed": true,  "expand":false, "path":"Parent 5", "parent":"0", "Searched":true}
        ];
    }
    getData(): any {
        this.filteredData=[];
        this.searchData();
        return this.filteredData;
        // return this.data;
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

    getById(id:string){
        for(let i in this.data){
            if(this.data[i].id == id){
                return i;
            }
        }
    }

    searchData(){
        for(let i in this.data){
            this.data[i].Searched = false;
        }

        for(let i in this.data){
            if(this.data[i].text.toLowerCase().indexOf(this.Search.toLowerCase()) > -1){
                this.data[i].Searched=true;

                //выставить парентам
                let parent = this.data[i].parent;
                while(parent!="0"){
                    let id=this.getById(parent);
                    this.data[id].Searched=true;
                    parent=this.data[id].parent;
                }
            }
        }

        this.filteredData=[];
        for(let i in this.data){
            if(this.data[i].Searched){
                this.filteredData[this.filteredData.length] = this.data[i];
            }
        }
    }
}