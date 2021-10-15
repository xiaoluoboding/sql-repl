import { defineStore } from 'pinia'
import dayjs from 'dayjs'

import type { TabInfo } from './tabs'

type MENUS = 'connections' | 'savedQueries'

export const useAsideStore = defineStore({
  id: 'replAside',

  persist: {
    enabled: true,
  },

  state: () => ({
    activeMenu: 'connections' as MENUS,
    savedQueries: [] as TabInfo[],
    activeQuery: {} as TabInfo,
    showConnectionModal: false
  }),

  actions: {
    addQuery(payload: TabInfo) {
      this.savedQueries.push(payload)

      this.activeQuery = payload
    },
    removeQuery(payload: TabInfo) {
      this.savedQueries.splice(
        this.savedQueries.findIndex((tab) => tab.id === payload.id),
        1
      )
    },
    upsertQueries(payload: TabInfo) {
      const idx = this.savedQueries.findIndex((item) => item.id === payload.id)
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
