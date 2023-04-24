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
  duree_fonctionnement: DureeFonctionnement
  dataRequired: DataRequired
  etat: boolean
  lastData: LastData
}
export interface Module_simple {
  id: string
  stationName: string
  position: Position
  duree_fonctionnement: DureeFonctionnement
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

export interface Pagination {
  page: number
  limit: number
  totalCount: number
  totalPages: number
}
