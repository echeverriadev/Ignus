import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../providers/global.service';

@Component({
  selector: 'app-networks',
  templateUrl: './networks.component.html',
  styleUrls: ['./networks.component.css']
})
export class NetworksComponent implements OnInit {
  agency: any;
  socialNetworks: any;

  constructor(public _globalService: GlobalService) {
    this.agency=[];
    this.socialNetworks=[];
    
  }

  ngOnInit() {
    this._globalService.getModel('/api/agency')
     .then((result) => {
       this.agency=result['data'];
       this.socialNetworks= this.agency.socialNetworks
     },(err) => {
       console.log(err);
     });

  }

}
