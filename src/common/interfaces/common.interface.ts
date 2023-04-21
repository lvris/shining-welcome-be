export interface IError {
  message: string
  stack?: string
}

export interface IPage {
  page?: number
  size?: number
}

export interface ICursor {
  cursorID?: number
  size?: number
}