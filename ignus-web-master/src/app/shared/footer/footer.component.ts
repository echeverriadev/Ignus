import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../providers/global.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit {
  agency: any;
  typeContacts:any;
  logo:any;
  Subject:any;
  contact:any;
  new:any;

  constructor(public _globalService: GlobalService) {
    this.agency=[];
    this.typeContacts=[];
    this.Subject=[];
    this.logo={};
    
    this.contact={};
    this.new = {};

    
  }

  ngOnInit() {
    this.getAgency();
    this.getTypeContactForSelect();
    this.getSubjectForSelect();
  }

  getAgency(){
    this._globalService.getModel('/api/agency')
    .then((result) => {
      this.agency=result['data'];
      this.logo=this.agency['logo']['url'];
    },(err) => {
      console.log(err);
    });
  }

  getTypeContactForSelect(){
    this._globalService.getModel('/api/typeContact')
     .then((result) => {
      this.typeContacts=result['data'];
     },(err) => {
       console.log(err);
     });
  }

getSubjectForSelect(){
    this._globalService.getModel('/api/subject')
     .then((result) => {
      this.Subject=result['data'];
     },(err) => {
       console.log(err);
     });
  }

  
  saveContact() {
    if ( this.contact.email !== '' || this.contact.TypeContactId !== '' || this.contact.SubjectId !== ''
        || this.contact.description !== '' ){

      this._globalService.addModel(this.contact,"/api/contact").then(data =>{
        alert('Mensaje enviado');
      })
    }
      const data = JSON.parse(localStorage.getItem("contact"));
      console.log(data);
  
  }
}
