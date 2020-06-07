import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../providers/global.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})

export class LayoutComponent implements OnInit{
  agency: any;
  logo:any;

  constructor(public _globalService: GlobalService,private spinner: NgxSpinnerService) {
    this.agency=[];
    this.logo={};
    
  }

  ngOnInit() {
    this.getAgency();

     /** spinner starts on init */
     this.spinner.show();
 
     setTimeout(() => {
         /** spinner ends after 5 seconds */
         this.spinner.hide();
     }, 5000);
  }

  getAgency(){
    this._globalService.getModel('/api/agency')
    .then((result) => {
      this.agency=result['data'];
      this.logo= this.agency['logo']['url'];
    },(err) => {
      console.log(err);
    });
  }



}