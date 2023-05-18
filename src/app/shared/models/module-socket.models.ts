import { Elapse, ElapseTotal } from "./module.models"

export interface Data_socket {
  module: Module_socket
  trame: Trame_socket
}

export interface Module_socket {
  dataRequired: DataRequired
  temp: number
  fuel: number
  bat: number
  ph1: number
  ph2: number
  ph3: number
  freq: number
  oilPress: number
  elapse_total: ElapseTotal
  stationName: string
  elapse_total_number: number
  elapse: Elapse
  status: string
  _id: string
  createdAt: Date
  updatedAt: Date
  __v: number
}

export interface DataRequired {
  temp: number
  fuel: number
  ph1: number
  ph2: number
  ph3: number
  oilPress: number
  freq: number
}

export interface Trame_socket {
  idModule: string
  temp: number
  fuel: number
  ph1: number
  ph2: number
  ph3: number
  freq: number
  oilPress: number
  date: Date
  status: string
  _id: string
  createdAt: Date
  updatedAt: Date
  __v: number
  bat: number
}
