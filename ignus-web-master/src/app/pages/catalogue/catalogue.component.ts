import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../providers/global.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
  properties: any;

  constructor(public _globalService: GlobalService, private router:Router) { 
    this.properties=[];

  }

  searchProperty(term:string){
    console.log(term);
  }

  getProperties(){
    this._globalService.getModel('/api/property/catalogue')
     .then((result) => {
       this.properties=result['data'];
     },(err) => {
       console.log(err);
     });
  }

  showProperty( idx:number ){
    this.router.navigate( ['/propiedad',idx] );
  }
  pageActual:number =1;
  ngOnInit() {
    this.getProperties();
  }

}
