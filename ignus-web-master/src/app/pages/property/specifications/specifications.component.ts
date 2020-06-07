import { Component, OnInit, Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../../providers/global.service';

@Component({
  selector: 'app-specifications',
  templateUrl: './specifications.component.html',
  styleUrls: ['./specifications.component.css']
})

export class SpecificationsComponent implements OnInit {
  catalogue:any;
  property:any;
  aux:any;
  typeSpecifications:any;
  structure:any;

  constructor(private route: ActivatedRoute, private _globalService: GlobalService, private location: Location) { 
    this.catalogue=[]
    this.property=[];
    this.typeSpecifications=[];
    this.structure=[];
    this.aux={}
  }

  getProperty(){
    const id = this.route.snapshot.paramMap.get('id');

    this._globalService.getModel(`/api/property/catalogue`)
     .then((result) => {
       this.catalogue=result['data'];
       this.property = this.catalogue.filter( property => property.id == id)
       this.aux = this.property[0];
       this.typeSpecifications =this.aux.typeSpecifications;
       
     },(err) => {
       console.log(err);
     });
  }

  ngOnInit() {
    console.log('BRUJA')
    this.getProperty();
    
  }

}
