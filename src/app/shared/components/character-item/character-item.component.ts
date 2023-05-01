import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-character-item',
  templateUrl: './character-item.component.html',
  styleUrls: ['./character-item.component.scss']
})
export class CharacterItemComponent implements OnInit {

  @Input() title!: string
  @Input() value!:number
  @Input() mesure!:string
  @Input() icon!: string

  constructor() { }

  ngOnInit(): void {
  }

}
