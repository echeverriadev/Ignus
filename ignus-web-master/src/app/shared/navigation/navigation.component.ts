import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../providers/global.service'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {
  agency: any;

  constructor(public _globalService: GlobalService) {
    this.agency=[];
    
  }

  ngOnInit() {
    this._globalService.getModel('/api/agency')
     .then((result) => {
       this.agency=result['data'];
     },(err) => {
       console.log(err);
     });

  }



}
