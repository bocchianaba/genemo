import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Module, Module_info } from 'src/app/shared/models/module.models';
import { ModuleService } from '../../services/module.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ChartConfiguration, ChartType } from 'chart.js';
import { Data } from 'src/app/shared/models/pagination.model';

@Component({
  selector: 'app-module-details',
  templateUrl: './module-details.component.html',
  styleUrls: ['./module-details.component.scss']
})
export class ModuleDetailsComponent implements OnInit, OnDestroy {

  events=[]
  module$!: Observable<Data<Module>>
  module!: Data<Module>
  id!: string|null
  module_subscription: any;
  err_message: any;
  loading: boolean=true;

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ 65, 59, 80, 81, 56, 55, 40 ],
        label: 'Series A',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [ 28, 48, 40, 19, 86, 27, 90 ],
        label: 'Series B',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
      {
        data: [ 180, 480, 770, 90, 1000, 270, 400 ],
        label: 'Series C',
        // yAxisID: 'y1',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ]
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    }
  };

  public lineChartType: ChartType = 'line';

  constructor(
    private module_service: ModuleService,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private loader: NgxUiLoaderService
  ) {
    this.id=this.route.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.module$=this.module_service.get_module(this.id)
    this.loader.startBackground()
    this.module_subscription=this.module$.subscribe(
      {
        next:(mod)=>{
          console.log({mod})
          this.loading=false
          this.module=mod
        },
        error:(err)=>{
          console.log({err})
          this.err_message=err.error.message
          this.loading=false
          this.loader.stopBackground()
        },
        complete:()=>{
          this.loading=false
          this.loader.stopBackground()
        }
      }
    )
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.module_subscription.unsubscribe()
  }

  page_change(page: number){
    console.log(page)
  }

}
