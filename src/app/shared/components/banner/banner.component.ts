import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  @Input() title?: string
  @Input() description?: boolean
  @Input() duree_totale?: any
  @Input() duree_vidange?: any
  @Input() date_vidange?: any

  constructor() { }

  ngOnInit(): void {
  }

}
