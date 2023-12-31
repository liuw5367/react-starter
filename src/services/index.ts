export interface ApiResponse<T = any> {
  success: boolean

  code: number | string
  message: string
  data: T
}

export interface PageRequest {
  current?: number
  size?: number
  search?: string
}

export interface PageBody<T = any> {
  current: number
  total: number
  size: number

  list: T[]
}
