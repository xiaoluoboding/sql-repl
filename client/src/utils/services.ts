import { AnyRecord } from '../types/index'
import { request } from './request'

const BASE_URL = '/api/v1/sqlite'

export const getTableColumns = async (params: string) => {
  const url = `${BASE_URL}/getTableColumns/${params}`
  const res = await request(url)
  return res.data
}

export const execSQL = async (params: string): Promise<AnyRecord[]> => {
  const url = `${BASE_URL}/execSQL/${params}`
  const res = await request(url)
  return res.data
}