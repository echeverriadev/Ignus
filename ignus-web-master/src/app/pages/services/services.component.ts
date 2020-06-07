import { Component, OnInit ,TemplateRef} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { GlobalService } from '../../providers/global.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})

export class ServicesComponent implements OnInit{
  modalRef: BsModalRef;

  typeServices: any;
  requeriments:any;
  show: boolean;

  constructor(public _globalService: GlobalService,private modalService: BsModalService) {
    this.typeServices=[];
    this.requeriments=[];
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  
  sliderShow(){
    //console.log(this.typeServices.length)
    this.show = false;
    if(this.typeServices.lenght<=4){
      return this.show=false;
    }else{
      return this.show=true;
    }
  }

  getTypeServices(){

    this._globalService.getModel('/api/typeService')
     .then((result) => {
      //  console.log(result['data']);
       this.typeServices=result['data'];
       this.typeServices.length;
     },(err) => {
       console.log(err);
     });
  }

  ngOnInit() {
    this.sliderShow();
    this.getTypeServices()

  }

  
}