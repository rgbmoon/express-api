export interface BaseQueryParams {
  [key: string]: string | undefined
  search?: string
  sort?: 'ASC' | 'DESC'
  limit?: string
  offset?: string
}
