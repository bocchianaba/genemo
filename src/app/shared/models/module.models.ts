import { Pagination } from "./pagination.model"

export interface Module_list {
  data: Module[]
  pagination: Pagination
}
export interface Module_info {
  data: Module_simple
  lastInfo: LastData
}

export interface Module {
  id: string
  stationName: string
  position: Position
  duree_fonctionnement: number
  duree_fonctionnement_format: DureeFonctionnement
  dataRequired: DataRequired
  etat: boolean
  lastData: LastData
}
export interface Module_simple {
  id: string
  stationName: string
  position: Position
  duree_fonctionnement: number
  duree_fonctionnement_format: DureeFonctionnement
  dataRequired: DataRequired
  etat: boolean
}

export interface Position {}

export interface DureeFonctionnement {
  milliseconds: number
  seconds: number
  minutes: number
  hours: number
  days: number
  months: number
  years: number
}

export interface DataRequired {}

export interface LastData {
  data: Data
  date_debut: string
  date_fin: string
}

export interface Data {
  temperature: number
  fuel: number
  frequence: number
  pression_huile: number
  phase1: number
  phase2: number
  date: string
  _id: string
}


export interface Module {
  id: string
  idModule: string
  date_debut: string
  date_fin: string
  infos: Info[]
  createdAt: string
}

export interface Info {
  temperature: number
  fuel: number
  frequence: number
  pression_huile: number
  phase1: number
  phase2: number
  date: string
  _id: string
}

