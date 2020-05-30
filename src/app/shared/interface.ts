export interface Todo {
  title: string,
  author: string,
  date: Date,
  id?: string
  isTodo: Boolean,
}


export interface Environments {
  apiKey: string,
  production: boolean,
  fbUrl: string
}

export interface FbCreateResponse {
  name: string
}
