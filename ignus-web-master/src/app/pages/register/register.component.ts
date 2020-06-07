import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { GlobalService } from '../../providers/global.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  agency: any;
  logo: any;

  client:any;
  new:any;
   
  notificationEmail:any;
  notificationSMS:any;
  notificationWS:any;
  public birthDate:any;


  constructor(public _globalService: GlobalService) {
    this.agency=[];
    this.logo=[];
    this.birthDate = moment(this.birthDate).format('DD/MM/YYYY');

    this.client={};
    this.new={};
    this.notificationEmail=false;
    this.notificationSMS=false;
this.notificationWS=false;
    
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




  subscribe(){

    if(this.client.username !==''|| this.client.firstName !==''|| this.client.lastName !==''|| this.client.gender !==''
|| this.client.phoneNumber !==''|| this.client.birthDate !=='' || this.client.notificationEmail !== '' 
|| this.client.notificationWS !=='' || this.client.notificationSMS !== ''){

      this._globalService.addModel(this.client,"/api/user/client").then(response =>{
        if(response['status']){
          alert(response['message']['text']) 
        }else{
          alert(response['message']['text'])
        }
        
      })
    }
      const data = JSON.parse(localStorage.getItem("client"));
     
      this.client.username='';
      this.client.firstName='';
      this.client.lastName='';
      this.client.gender='';
      this.client.birthDate='';
    }




  ngOnInit() {
    this.getAgency()
  }

}
