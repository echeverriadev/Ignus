import { Component, OnInit, Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../providers/global.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})

@Injectable()
export class PropertyComponent implements OnInit {
  catalogue:any;
  property:any;
  typeService:any;
  typeProperty:any;
  publication:any;
  state:any;
  municipality:any;
  parish:any;
  aux:any;

  constructor(private route: ActivatedRoute, private _globalService: GlobalService, private location: Location) { 
    this.catalogue=[];
    this.property=[];
    this.typeService=[];
    this.typeProperty=[];
    this.publication=[];
    this.state=[];
    this.municipality=[];
    this.parish=[];
    this.aux={}
  }


  getProperty(){
    const id = this.route.snapshot.paramMap.get('id');

    this._globalService.getModel(`/api/property/catalogue`)
     .then((result) => {

       this.catalogue=result['data'];
       this.property = this.catalogue.filter( property => property.id == id)
       this.aux = this.property[0];
       this.typeService =this.aux.TypeService;
       this.typeProperty =this.aux.typeProperty;
       this.publication =this.aux.Publication;
       this.state =this.aux.state;
       this.municipality =this.aux.municipality;
       this.parish =this.aux.parish;
       console.log(this.aux)
     },(err) => {
       console.log(err);
     });
  }

  ngOnInit() {
    this.getProperty();
    
  }

}
