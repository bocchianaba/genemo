import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit {

  title = 'generator-manager';
  display: string='list'

  constructor() { }

  ngOnInit(): void {
  }

}
