import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-module-details',
  templateUrl: './module-details.component.html',
  styleUrls: ['./module-details.component.scss']
})
export class ModuleDetailsComponent implements OnInit {

  events=[]

  constructor() { }

  ngOnInit(): void {
  }

}
