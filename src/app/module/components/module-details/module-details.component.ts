import { Module, Trame } from './../../../shared/models/module.models';
import { Component, OnInit, OnDestroy, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { BehaviorSubject, Observable, map, shareReplay, tap } from 'rxjs';
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
import { BaseChartDirective } from 'ng2-charts';

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
        borderColor: 'rgba(148,159,177,0.6)',
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
        borderColor: 'rgba(77,83,96,0.6)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      }
    ],
    labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ]
  };
  public oil_press_lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ 28, 48, 40, 19, 86, 27, 90 ],
        label: 'Pression d\'huile',
        backgroundColor: 'rgba(22,247,69,0.2)',
        borderColor: 'rgba(22,247,69,0.6)',
        pointBackgroundColor: 'rgba(22,247,69,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      }
    ],
    labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ]
  };
  public freq_lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ 28, 48, 40, 19, 86, 27, 90 ],
        label: 'Fréquence',
        backgroundColor: 'rgba(250,195,39,0.2)',
        borderColor: 'rgba(250,195,39,0.6)',
        pointBackgroundColor: 'rgba(250,195,39,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      }
    ],
    labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ]
  };
  public phase_lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ 28, 48, 40, 19, 86, 27, 90 ],
        label: 'Phase 1',
        backgroundColor: 'rgba(23,83,250,0.2)',
        borderColor: 'rgba(23,83,250,0.6)',
        pointBackgroundColor: 'rgba(23,83,250,0.2)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
      {
        data: [ 42, 204, 56, 49, 86, 27, 102 ],
        label: 'Phase 2',
        backgroundColor: 'rgba(57,57,57,0.2)',
        borderColor: 'rgba(57,57,57,0.6)',
        pointBackgroundColor: 'rgba(57,57,57,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
      {
        data: [ 28, 48, 40, 19, 86, 27, 90 ],
        label: 'Phase 3',
        backgroundColor: 'rgba(125,125,125,0.2)',
        borderColor: 'rgba(125,125,125,0.6)',
        pointBackgroundColor: 'rgba(125,125,125,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
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
  module_simple$!: Observable<Module_info>;
  module_simple!: Module_info
  trames$!: Observable<Trames|null>;
  vidanges$!: Observable<Data<InfoVidange>>;
  private trame_subject= new BehaviorSubject<Trames|null>(null)
  // fuel_data!: ChartConfiguration['data']=new ChartConfiguration['data']();
  @ViewChildren(BaseChartDirective) chart?: QueryList<BaseChartDirective>;


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
    this.trames$= this.trame_subject.asObservable()
  }

  date_pipe_transform(data_date: any){
    return this.date_pipe.transform(data_date, "dd MMMM yyyy à HH:mm")
  }

  ngOnInit(): void {
    this.module_service.get_module_trames(this.id).subscribe(
      (trames: Trames)=>this.trame_subject.next(trames)
    )
    this.trames$.subscribe({
      next: (trames: Trames|null)=>{
        this.fuel_lineChartData.labels=trames?.data.map((trame: Trame)=> this.date_pipe.transform(trame.date, "dd MMMM yyyy à HH:mm"))
        this.fuel_lineChartData.datasets[0].data=trames?.data.map((trame: Trame)=> trame.fuel)??[0,0,0,0,0,0,0,0,]
        this.temperature_lineChartData.labels=trames?.data.map((trame: Trame)=> this.date_pipe.transform(trame.date, "dd MMMM yyyy à HH:mm"))
        this.temperature_lineChartData.datasets[0].data=trames?.data.map((trame: Trame)=> trame.temp)??[0,0,0,0,0,0,0,0,]
        this.battery_lineChartData.labels=trames?.data.map((trame: Trame)=> this.date_pipe.transform(trame.date, "dd MMMM yyyy à HH:mm"))
        this.battery_lineChartData.datasets[0].data=trames?.data.map((trame: Trame)=> trame.bat)??[0,0,0,0,0,0,0,0,]
        this.oil_press_lineChartData.labels=trames?.data.map((trame: Trame)=> this.date_pipe.transform(trame.date, "dd MMMM yyyy à HH:mm"))
        this.oil_press_lineChartData.datasets[0].data=trames?.data.map((trame: Trame)=> trame?.oilPress??0)??[0,0,0,0,0,0,0,0,]
        this.freq_lineChartData.labels=trames?.data.map((trame: Trame)=> this.date_pipe.transform(trame.date, "dd MMMM yyyy à HH:mm"))
        this.freq_lineChartData.datasets[0].data=trames?.data.map((trame: Trame)=> trame?.freq??0)??[0,0,0,0,0,0,0,0,]
        this.phase_lineChartData.labels=trames?.data.map((trame: Trame)=> this.date_pipe.transform(trame.date, "dd MMMM yyyy à HH:mm"))
        this.phase_lineChartData.datasets[0].data=trames?.data.map((trame: Trame)=> trame?.ph1??0)??[0,0,0,0,0,0,0,0,]
        this.phase_lineChartData.datasets[1].data=trames?.data.map((trame: Trame)=> trame?.ph2??0)??[0,0,0,0,0,0,0,0,]
        this.phase_lineChartData.datasets[2].data=trames?.data.map((trame: Trame)=> trame?.ph3??0)??[0,0,0,0,0,0,0,0,]
        console.log({fuel: this.fuel_lineChartData.datasets[0].data})
        console.log({temperature: this.temperature_lineChartData.datasets[0].data})
        console.log({battery: this.battery_lineChartData.datasets[0].data})
        console.log({oil_press: this.oil_press_lineChartData.datasets[0].data})
        console.log({freq: this.freq_lineChartData.datasets[0].data})
        console.log({phase1: this.phase_lineChartData.datasets[0].data})
        console.log({phase2: this.phase_lineChartData.datasets[1].data})
        console.log({phase3: this.phase_lineChartData.datasets[2].data})
        // Accédez aux instances du composant avec les identifiants spécifiques après que la vue a été initialisée
        this.chart?.forEach((c:BaseChartDirective) => {
          // Utilisez l'instance du composant cible ici
          c?.update();
        });
      }
    })
    this.module_simple$=this.module_service.get_simple_module(this.id)
    this.module_simple$.subscribe(mod=> this.module_simple=mod)
    this.vidanges$=this.module_service.get_module_vidanges(this.id)

    this.socket.on("incomingTrame",(data: Data_socket)=>{
      console.log("trame event",{data})
      this.module_simple$=this.module_simple$.pipe(
        map((module_simple:Module_info)=>{
          let module=Object.assign({}, module_simple)
          module.lastInfoTrame={...data.trame, id:data.trame._id}
          module.data.status=data.trame.status
          return module
        })
      )
      this.trames$.subscribe(
        (trames: Trames|null)=>{
          let data_trames=Object.assign({}, trames)
          data_trames?.data.unshift({...data.trame, id: data.trame._id})
          data_trames.data=data_trames?.data.slice(0,10)
          console.log({data_trames})
          console.log({trames})
          // this.trame_subject.next(data_trames)
        this.fuel_lineChartData.labels=data_trames?.data.map((trame: Trame)=> this.date_pipe.transform(trame.date, "dd MMMM yyyy à HH:mm"))
        this.fuel_lineChartData.datasets[0].data=data_trames?.data.map((trame: Trame)=> trame.fuel)??[0,0,0,0,0,0,0,0,]
        this.temperature_lineChartData.labels=data_trames?.data.map((trame: Trame)=> this.date_pipe.transform(trame.date, "dd MMMM yyyy à HH:mm"))
        this.temperature_lineChartData.datasets[0].data=data_trames?.data.map((trame: Trame)=> trame.temp)??[0,0,0,0,0,0,0,0,]
        this.battery_lineChartData.labels=data_trames?.data.map((trame: Trame)=> this.date_pipe.transform(trame.date, "dd MMMM yyyy à HH:mm"))
        this.battery_lineChartData.datasets[0].data=data_trames?.data.map((trame: Trame)=> trame.bat)??[0,0,0,0,0,0,0,0,]
        this.oil_press_lineChartData.labels=data_trames?.data.map((trame: Trame)=> this.date_pipe.transform(trame.date, "dd MMMM yyyy à HH:mm"))
        this.oil_press_lineChartData.datasets[0].data=data_trames?.data.map((trame: Trame)=> trame?.oilPress??0)??[0,0,0,0,0,0,0,0,]
        this.freq_lineChartData.labels=data_trames?.data.map((trame: Trame)=> this.date_pipe.transform(trame.date, "dd MMMM yyyy à HH:mm"))
        this.freq_lineChartData.datasets[0].data=data_trames?.data.map((trame: Trame)=> trame?.freq??0)??[0,0,0,0,0,0,0,0,]
        this.phase_lineChartData.labels=data_trames?.data.map((trame: Trame)=> this.date_pipe.transform(trame.date, "dd MMMM yyyy à HH:mm"))
        this.phase_lineChartData.datasets[0].data=data_trames?.data.map((trame: Trame)=> trame?.ph1??0)??[0,0,0,0,0,0,0,0,]
        this.phase_lineChartData.datasets[1].data=data_trames?.data.map((trame: Trame)=> trame?.ph2??0)??[0,0,0,0,0,0,0,0,]
        this.phase_lineChartData.datasets[2].data=data_trames?.data.map((trame: Trame)=> trame?.ph3??0)??[0,0,0,0,0,0,0,0,]
        console.log({fuel: this.fuel_lineChartData.datasets[0].data})
        console.log({temperature: this.temperature_lineChartData.datasets[0].data})
        console.log({battery: this.battery_lineChartData.datasets[0].data})
        console.log({oil_press: this.oil_press_lineChartData.datasets[0].data})
        console.log({freq: this.freq_lineChartData.datasets[0].data})
        console.log({phase1: this.phase_lineChartData.datasets[0].data})
        console.log({phase2: this.phase_lineChartData.datasets[1].data})
        console.log({phase3: this.phase_lineChartData.datasets[2].data})
          if(data.trame.idModule==this.module_simple.data.id) {
            this.toast.info("Le module vient d'envoyer une nouvelle trame")
            // Accédez aux instances du composant avec les identifiants spécifiques après que la vue a été initialisée
            this.chart?.forEach((c:BaseChartDirective) => {
              // Utilisez l'instance du composant cible ici
              c?.update();
            });
          }
          return data_trames
        }
      )
    })
    this.socket.on("vidangeCreated", (data: Module)=>{
      // alert("vidange créer")
      console.log({data})
      this.module_simple$=this.module_simple$.pipe(
        map((module: Module_info)=>{
          this.toast.info("Le module "+data.stationName+" est en pleine vidange !")
          module.data={...data}
          return module
        }),
        shareReplay(1)
      )
    })
  }
  ngOnDestroy(): void {

  }

  update_module_simple(event: any){
    const id= event.target.value
    this.module_simple$=this.trames$.pipe(
      map(
        (trames: Trames | null)=> {
          const trame=trames?.data.find(t=> t.id==id)
          console.log({trame, id})
          return {
            data: {...this.module_simple.data},
            lastInfoTrame: {...trame}
          }
        }
      )
    )
  }

  page_change(page: number){
    this.loading=true
    console.log(page)
    this.trames$=this.module_service.get_module_trames(this.id, page)
    this.module_simple$=this.trames$.pipe(
      map(
        (trames: Trames | null)=> {
          const trame=trames?.data[0]
          return {
            data: {...this.module_simple.data},
            lastInfoTrame: {...trame}
          }
        }
      )
    )
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
          this.loading=false
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
    this.trames$=this.module_service.get_module_trames(this.id,1,10,`${(this.fromDate?.month??1)}-${this.fromDate?.day}-${this.fromDate?.year??0}`,`${(this.toDate?.month??1)}-${this.toDate?.day}-${this.toDate?.year??0}`)
    this.vidanges$=this.module_service.get_module_vidanges(this.id,1,10,`${(this.fromDate?.month??1)}-${this.fromDate?.day}-${this.fromDate?.year??0}`,`${(this.toDate?.month??1)}-${this.toDate?.day}-${this.toDate?.year??0}`)
    this.trames$.subscribe(
      (trames: Trames|null)=>{
        let data_trames=Object.assign({}, trames)
      this.fuel_lineChartData.labels=data_trames?.data.map((trame: Trame)=> this.date_pipe.transform(trame.date, "dd MMMM yyyy à HH:mm"))
      this.fuel_lineChartData.datasets[0].data=data_trames?.data.map((trame: Trame)=> trame.fuel)??[0,0,0,0,0,0,0,0,]
      this.temperature_lineChartData.labels=data_trames?.data.map((trame: Trame)=> this.date_pipe.transform(trame.date, "dd MMMM yyyy à HH:mm"))
      this.temperature_lineChartData.datasets[0].data=data_trames?.data.map((trame: Trame)=> trame.temp)??[0,0,0,0,0,0,0,0,]
      this.battery_lineChartData.labels=data_trames?.data.map((trame: Trame)=> this.date_pipe.transform(trame.date, "dd MMMM yyyy à HH:mm"))
      this.battery_lineChartData.datasets[0].data=data_trames?.data.map((trame: Trame)=> trame.bat)??[0,0,0,0,0,0,0,0,]
      this.oil_press_lineChartData.labels=data_trames?.data.map((trame: Trame)=> this.date_pipe.transform(trame.date, "dd MMMM yyyy à HH:mm"))
      this.oil_press_lineChartData.datasets[0].data=data_trames?.data.map((trame: Trame)=> trame?.oilPress??0)??[0,0,0,0,0,0,0,0,]
      this.freq_lineChartData.labels=data_trames?.data.map((trame: Trame)=> this.date_pipe.transform(trame.date, "dd MMMM yyyy à HH:mm"))
      this.freq_lineChartData.datasets[0].data=data_trames?.data.map((trame: Trame)=> trame?.freq??0)??[0,0,0,0,0,0,0,0,]
      this.phase_lineChartData.labels=data_trames?.data.map((trame: Trame)=> this.date_pipe.transform(trame.date, "dd MMMM yyyy à HH:mm"))
      this.phase_lineChartData.datasets[0].data=data_trames?.data.map((trame: Trame)=> trame?.ph1??0)??[0,0,0,0,0,0,0,0,]
      this.phase_lineChartData.datasets[1].data=data_trames?.data.map((trame: Trame)=> trame?.ph2??0)??[0,0,0,0,0,0,0,0,]
      this.phase_lineChartData.datasets[2].data=data_trames?.data.map((trame: Trame)=> trame?.ph3??0)??[0,0,0,0,0,0,0,0,]
      console.log({fuel: this.fuel_lineChartData.datasets[0].data})
      console.log({temperature: this.temperature_lineChartData.datasets[0].data})
      console.log({battery: this.battery_lineChartData.datasets[0].data})
      console.log({oil_press: this.oil_press_lineChartData.datasets[0].data})
      console.log({freq: this.freq_lineChartData.datasets[0].data})
      console.log({phase1: this.phase_lineChartData.datasets[0].data})
      console.log({phase2: this.phase_lineChartData.datasets[1].data})
      console.log({phase3: this.phase_lineChartData.datasets[2].data})
      }
    )
  }
}
