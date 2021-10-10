import { AnyRecord } from '../types/index'

export interface REQUEST_DATA {
  total: number
  data: AnyRecord | AnyRecord[]
}

const request = async (url: string) => {
  const res = await fetch(url)
  return res.json()
}

export { request }
