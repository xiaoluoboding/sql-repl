import { defineStore } from 'pinia'
import dayjs from 'dayjs'

import type { TabInfo } from './tabs'

type MENUS = 'connections' | 'SQL Queries'

export const useAsideStore = defineStore('aside', {
  state: () => ({
    activeMenu: 'connections' as MENUS,
    savedQueries: [] as TabInfo[],
    activeQuery: {} as TabInfo,
  }),

  actions: {
    addQuery(payload: TabInfo) {
      this.savedQueries.push(payload)

      this.activeQuery = payload
    },
    upsertQueries(payload: TabInfo) {
      const idx = this.savedQueries.findIndex(
        (item) => item.id === payload.id
      )
      if (this.savedQueries.length === 0 || idx === -1) {
        // add a new query
        this.addQuery(payload)
      } else {
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
