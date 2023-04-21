export interface Data<T> {
  data: T[]
  pagination: Pagination
}

export interface Pagination {
  page: number
  limit: number
  totalCount: number
  totalPages: number
}
