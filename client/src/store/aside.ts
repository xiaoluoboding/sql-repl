import { defineStore } from 'pinia'
import dayjs from 'dayjs'

import { shortid } from '../utils'

export interface QUERY_INFO {
  id: string
  savedAt: string
  label: string
  queries: string
}

type MENUS = 'connections' | 'SQL Queries'

export const useAsideStore = defineStore('aside', {
  state: () => ({
    activeMenu: 'connections' as MENUS,
    savedQueries: [] as QUERY_INFO[],
    activeQuery: {} as QUERY_INFO,
  }),

  actions: {
    addQuery(label: string, queries: string) {
      const queryInfo = {
        id: shortid(),
        savedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        label,
        queries,
      }

      this.savedQueries.push(queryInfo)

      this.activeQuery = queryInfo
    },
    upsertQueries(payload: QUERY_INFO) {
      if (this.savedQueries.length === 0) {
        // add a new query
        this.addQuery(payload.label, payload.queries)
      } else {
        const idx = this.savedQueries.findIndex(
          (item) => item.id === payload.id
        )

        const newQueryInfo = {
          ...payload,
          savedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        }

        this.savedQueries.splice(idx, 1, newQueryInfo)

        this.activeQuery = newQueryInfo
      }
    },
  },
})
