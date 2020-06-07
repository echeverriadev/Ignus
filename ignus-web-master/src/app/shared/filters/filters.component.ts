import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../providers/global.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  typeServices: any;
  typeProperties: any;
  states: any;
  cities:any;

  constructor(public _globalService:GlobalService) { 
    this.typeServices=[];
    this.typeProperties=[];
    this.states=[];
    this.cities=[];
  }

  getTypeServices(){
    this._globalService.getModel('/api/typeService')
     .then((result) => {
       this.typeServices=result['data'];
     },(err) => {
       console.log(err);
     });
  }

  getTypeOfProperty(){
    this._globalService.getModel('/api/typeProperty')
     .then((result) => {
       this.typeProperties=result['data'];
     },(err) => {
       console.log(err);
     });
  }

  getState(){
    this._globalService.getModel('/api/state')
     .then((result) => {
       this.states=result['data'];
     },(err) => {
       console.log(err);
     });
  }

  getCity(){
    console.log("getcity" ,this.states)
     this.states.forEach(element => {
      this._globalService.getModel_Id(element,'/state/city')
      .then(data => {
        this.cities.push(data['data']);
      console.log(" estas son las ciudades ciudades" ,this.cities)
      });
     }); 
    }


  ngOnInit() {
    this.getTypeServices();
    this.getTypeOfProperty();
    this.getState();
    this.getCity();
  }

}
