import { Module, Trame } from './../../../shared/models/module.models';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DataRequired, InfoVidange, Module_info, Trames } from 'src/app/shared/models/module.models';
import { ModuleService } from '../../services/module.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ChartConfiguration, ChartType } from 'chart.js';
import { Data } from 'src/app/shared/models/pagination.model';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Socket } from 'ngx-socket-io';
import { DatePipe } from '@angular/common';
import { AutoUnsubscribe } from 'src/app/shared/decorators/auto-unsubscribe.decorator';
import { Data_socket } from 'src/app/shared/models/module-socket.models';

@AutoUnsubscribe
@Component({
  selector: 'app-module-details',
  templateUrl: './module-details.component.html',
  styleUrls: ['./module-details.component.scss']
})
export class ModuleDetailsComponent implements OnInit, OnDestroy {

  events=[]
  id!: string|null
  module_subscription: any;
  err_message: any;
  loading: boolean=true;

  public fuel_lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ 165, 200, 150, 251, 45, 687, 142 ],
        label: 'Fuel',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ]
  };
  public temperature_lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ 180, 480, 770, 90, 1000, 270, 400 ],
        label: 'Température',
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
  public battery_lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ 28, 48, 40, 19, 86, 27, 90 ],
        label: 'Battérie',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
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
    },
    scales: {
      x:{
        ticks:{
          callback: (value)=>{
            return this.date_pipe.transform(value, "dd MMMM yyyy hh:mm:ss")
          }
        }
      }
    }
  };

  public lineChartType: ChartType = 'line';
  module_simple$!: Observable<Module_info>;
  module_simple!: Module_info
  trames$!: Observable<Trames>;
  vidanges$!: Observable<Data<InfoVidange>>;
  // fuel_data!: ChartConfiguration['data']=new ChartConfiguration['data']();

  constructor(
    private module_service: ModuleService,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private loader: NgxUiLoaderService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private socket: Socket,
    private date_pipe: DatePipe
  ) {
    this.id=this.route.snapshot.paramMap.get('id')
		this.fromDate = calendar.getToday();
		this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit(): void {
    this.trames$=this.module_service.get_module_trames(this.id)
    this.trames$.subscribe({
      next: (trames: Trames)=>{
        this.fuel_lineChartData.labels=trames.data.map((trame: Trame)=> trame.date??trame.createdAt)
        this.fuel_lineChartData.datasets[0].data=trames.data.map((trame: Trame)=> trame.fuel)
        this.temperature_lineChartData.labels=trames.data.map((trame: Trame)=> trame.date??trame.createdAt)
        this.temperature_lineChartData.datasets[0].data=trames.data.map((trame: Trame)=> trame.temp)
        this.battery_lineChartData.labels=trames.data.map((trame: Trame)=> trame.date??trame.createdAt)
        this.battery_lineChartData.datasets[0].data=trames.data.map((trame: Trame)=> trame.bat)
      }
    })
    this.module_simple$=this.module_service.get_simple_module(this.id)
    this.module_simple$.subscribe(mod=> this.module_simple=mod)
    this.vidanges$=this.module_service.get_module_vidanges(this.id)

    this.socket.on("incomingTrame",(data: Data_socket)=>{
      alert("nouvelle trame")
      console.log("trame event",{data})
      this.trames$=this.trames$.pipe(
        map((trames: Trames)=>{
          trames.data.unshift({...data.trame, id: data.trame._id})
          trames.data.slice(0,10)
          if(data.trame.idModule==this.module_simple.data.id) {
            this.toast.info("Le module vient d'envoyer une nouvelle trame")
          }
          return trames
        })
      )
    })
    this.socket.on("vidangeCreated", (data: Module)=>{
      alert("vidange créer")
      console.log({data})
      this.module_simple$=this.module_simple$.pipe(
        map((module: Module_info)=>{
          this.toast.info("Le module "+data.stationName+" est en pleine vidange !")
          module.data={...data}
          return module
        })
      )
    })
  }
  ngOnDestroy(): void {

  }

  page_change(page: number){
    console.log(page)
    this.trames$=this.module_service.get_module_trames(this.id, page)
    this.trames$.subscribe(
      {
        next:(trame)=>{
          console.log({trame})
          // this.fuel_data.labels=this.module.data.map(
          //   (mod)=>{
          //     let data: string[]=[]
          //     mod.infos.map(
          //       info=>{
          //         data.push(info.date)
          //       }
          //     )
          //     return data
          //   }
          // )
          // console.log({labels: this.fuel_data.labels})
        },
        error:(err)=>{
          console.log({err})
          this.err_message=err.error.message
        },
        complete:()=>{
        }
      }
    )
  }

  hoveredDate: NgbDate | null = null;

	fromDate: NgbDate | null;
	toDate: NgbDate | null;

	onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
	}

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

	validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	}
  filter_date(){
    console.log({from: this.fromDate,to:this.toDate})
    this.trames$=this.module_service.get_module_trames(this.id,1,10,new Date(this.fromDate?.year??0,this.fromDate?.month??1-1,this.fromDate?.day),new Date(this.toDate?.year??0,this.toDate?.month??1-1,this.toDate?.day))
    this.vidanges$=this.module_service.get_module_vidanges(this.id,1,10,new Date(this.fromDate?.year??0,this.fromDate?.month??1-1,this.fromDate?.day),new Date(this.toDate?.year??0,this.toDate?.month??1-1,this.toDate?.day))
  }
}
