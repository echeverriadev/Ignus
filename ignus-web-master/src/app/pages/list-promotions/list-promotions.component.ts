import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../providers/global.service';

@Component({
  selector: 'app-list-promotions',
  templateUrl: './list-promotions.component.html',
  styleUrls: ['./list-promotions.component.css']
})
export class ListPromotionsComponent implements OnInit {
  promotions:any;
  constructor(public _globalService: GlobalService) { 
    this.promotions=[];
  }

  getPromotions(){
    this._globalService.getModel('/api/promotion?status=A')
    .then((result) => {
      this.promotions=result['data'];
    },(err) => {
      console.log(err);
    });
  }
  ngOnInit() {
     this.getPromotions()
  }
  

}
