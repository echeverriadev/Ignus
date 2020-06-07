import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {

  @Input() property: any = {};
  @Input() index: number;

  @Output() propertySelected: EventEmitter<number>;
  
  constructor(private router: Router) {
    this.propertySelected = new EventEmitter();
  }


  ngOnInit() {
  }

}
