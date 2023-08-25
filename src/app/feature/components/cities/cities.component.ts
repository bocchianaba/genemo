import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { AutoUnsubscribe } from 'src/app/shared/decorators/auto-unsubscribe.decorator';
import { Town, User } from 'src/app/shared/models/user.models';

@AutoUnsubscribe
@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit, OnDestroy {

  cities$!: Observable<Town[]>
  search_name!: string

  constructor(private router: Router, private store: Store<{user: User}>) { }

  ngOnInit(): void {
    this.cities$=this.store.select('user').pipe(
      map(user=>{
        return user.idTownAuthorise
      })
    )
  }

  ngOnDestroy(): void {
      
  }

  search_city(){
    this.cities$=this.store.select('user').pipe(
      map(user=>{
        return user.idTownAuthorise.filter(city=>city.name?.includes(this.search_name))
      })
    )
  }

}
