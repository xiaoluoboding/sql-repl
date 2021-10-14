import { AnyRecord } from '../types/index'
import { request } from './request'

const BASE_URL = '/api/v1/sqlite'

export const connectDB = async (params: string) => {
  const url = `${BASE_URL}/connectDB/${params}`
  const res = await request(url)
  return res.data
}

export const getDBSchema = async () => {
  const url = `${BASE_URL}/getDBSchema`
  const res = await request(url)
  return JSON.parse(res.data[0].schemas)
}

export const getTableColumns = async (params: string) => {
  const url = `${BASE_URL}/getTableColumns/${params}`
  const res = await request(url)
  return res.data
}

export const execSQL = async (params: string): Promise<AnyRecord> => {
  const url = `${BASE_URL}/execSQL/${params}`
  const res = await request(url)
  return res
}