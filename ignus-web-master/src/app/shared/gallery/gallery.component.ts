import { Component, OnInit, Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../providers/global.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})

export class GalleryComponent implements OnInit {
  catalogue:any;
  property:any;
  publication:any;
  images:any;
  aux:any;
  constructor(private route: ActivatedRoute, private _globalService: GlobalService, private location: Location) { 
  this.catalogue=[];
  this.property=[];
  this.publication=[];
  this.images=[];
  this.aux=[];
}

  getProperty(){
    const id = this.route.snapshot.paramMap.get('id');

    this._globalService.getModel(`/api/property/catalogue`)
     .then((result) => {

       this.catalogue=result['data'];
       this.property = this.catalogue.filter( property => property.id == id)
       this.aux = this.property[0];
       this.publication =this.aux.Publication;
       this.images=this.publication.images;
       
     },(err) => {
       console.log(err);
     });
  }

  ngOnInit() {
    this.getProperty();
  }

}
