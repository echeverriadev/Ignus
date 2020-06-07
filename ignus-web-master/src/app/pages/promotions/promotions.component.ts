import { Component, OnInit,Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../providers/global.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})

@Injectable()
export class PromotionsComponent implements OnInit {
  promotions:any;
  promotion:any;
  aux:any;
  specifications:any;
  properties: any[] = []

  constructor(private route: ActivatedRoute, private _globalService: GlobalService, private location: Location) {
    this.promotions=[];
    this.promotion=[];
    this.aux=[];
    this.specifications=[];
  }

  getPromotions(){
    const id = this.route.snapshot.paramMap.get('id');

    this._globalService.getModel('/api/promotion?status=A')
    .then((result) => {
      this.promotions=result['data'];
      this.promotion = this.promotions[id]
      console.log(this.promotion)
      // iterando para obtener las propiedades
      if(this.promotion.properties.length)
        this.properties = this.promotion.properties
      else{
        for(let spec of this.promotion.specifications)
          for(let prope of spec.properties)
            this.properties.push(prope)
      }
      console.log(this.properties)
    },(err) => {
      console.log(err);
    });
  }

  ngOnInit() {
    this.getPromotions()
  }

}
