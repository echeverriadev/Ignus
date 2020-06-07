import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../providers/global.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  agency: any;
  contact: any;
  combo : any;
  combo1: any;

  constructor(public _globalService: GlobalService) {
    this.agency=[];
    this.contact={}; 
    this.combo=[];
    this.combo1=[];

  }


  send(){

    if ( this.contact.email !== '' || this.contact.TypeContactId !== '' || this.contact.SubjectId !== ''
        || this.contact.description !== '' ){

      this._globalService.addModel(this.contact,"/api/contact").then(data =>{
        alert('Mensaje enviado');
      })
    }
      const data = JSON.parse(localStorage.getItem("contact"));
      console.log(data);
  }



  ngOnInit() {
    this._globalService.getModel('/api/agency')
     .then((result) => {
      //console.log(result['data']);
       this.agency=result['data'];
     },(err) => {
       console.log(err);
     });

     this._globalService.getModel('/api/typeContact')
     .then((result) => {
      console.log(result['data']);
       this.combo=result['data'];
     
     
      },(err) => {
       console.log(err);
     
      });

this._globalService.getModel('/api/subject')
     .then((result) => {
      console.log(result['data']);
       this.combo1=result['data'];
     
     
      },(err) => {
       console.log(err);
     
      });




  }


}
