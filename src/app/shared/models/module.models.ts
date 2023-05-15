import { Pagination } from "./pagination.model"

export interface Module {
  id: string
  stationName: string
  position: Position
  dataRequired: DataRequired
  status: string
  elapse: Elapse
  elapse_total: ElapseTotal
  infoVidange: InfoVidange
  lastInfoTrame: InfoTrame
}

export interface Modules_Paginate{
  modules:Module[]
  pagination: Pagination
}

export interface Trames{
  data: Trame[]
  pagination: Pagination
}

export interface Module_info{
  data: Module
}

export interface InfoTrame {
  id: string
  temp: number
  fuel: number
  ph1: number
  ph2: number
  ph3: number
  freq: number
  oilPress: number
  date: any
  bat: number
  createdAt: string
  idModule: string
}


export interface Trame {
  id: string
  temp: number
  fuel: number
  bat: number
  ph1?: number
  ph2?: number
  ph3?: number
  freq?: number
  oilPress?: number
  date: Date
  createdAt: Date
  idModule: string
}

export interface Position {
  lat: string
  long: string
}

export interface DataRequired {
  temp: string
  fuel: string
  ph1: string
  ph2: string
  ph3: string
  oilPress: string
  freq: string
  bat: string
}

export interface Elapse {
  milliseconds: number
  seconds: number
  minutes: number
  hours: number
  days: number
  months: number
  years: number
}

export interface ElapseTotal {
  milliseconds: number
  seconds: number
  minutes: number
  hours: number
  days: number
  months: number
  years: number
}

export interface InfoVidange {
  id:string
  remarque: string
  date: Date
  createdAt: Date
  ph3: string
  days: string
  idModule: string
}
