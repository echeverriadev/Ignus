import { Component, OnInit, Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../providers/global.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: [ './map.component.css' ]
})

export class MapComponent  implements OnInit {
  catalogue:any;
  property:any;
  aux:any;


  constructor(private route: ActivatedRoute, private _globalService: GlobalService, private location: Location) { 
    this.catalogue=[];
    this.property=[];
    this.aux={}
  }
  
  ngOnInit(): void {
    this.getProperty();
  }

  // google maps zoom level
  zoom: number = 15;
  
  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;



  getProperty(){
  const id = this.route.snapshot.paramMap.get('id');

    this._globalService.getModel(`/api/property/catalogue`)
     .then((result) => {

       this.catalogue=result['data'];
       this.property = this.catalogue.filter( property => property.id == id)
       this.aux = this.property[0];
     },(err) => {
       console.log(err);
     });
  }


  markers: marker[] = [
	  {
		  lat: 51.673858,
		  lng: 7.815982,
		  label: 'A',
		  draggable: false
	  },
  ]
}

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
