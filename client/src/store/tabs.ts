import { defineStore } from 'pinia'
import dayjs from 'dayjs'

import { shortid } from '../utils'

export interface TabInfo {
  id: string;
  idx: number;
  label: string;
  isSaved: boolean;
  savedAt: string;
  queries: string;
}

export type AnyTabInfo = Partial<TabInfo>

export const useTabsStore = defineStore('tabs', {
  state: () => ({
    queryTabs: [] as TabInfo[],
    activeTab: {} as TabInfo,
    activeTabIdx: 1,
  }),

  getters: {
    currentTab: (state) => {
      const idx = state.queryTabs.findIndex((tab) => tab.idx === state.activeTabIdx)
      return idx === -1 ? {} : state.queryTabs[idx]
    },
  },

  actions: {
    addTab(queries: string) {
      const id = shortid()
      const idx =
        this.queryTabs.length === 0
          ? 1
          : Math.max(...this.queryTabs.map((tab) => tab.idx)) + 1
      const newTab = {
        id,
        idx,
        label: 'Untitled',
        isSaved: true,
        savedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        queries,
      }

      this.queryTabs.push(newTab)
      this.activeTab = newTab
      this.activeTabIdx = idx
    },
    removeTab() {
      this.queryTabs.splice(
        this.queryTabs.findIndex((tab) => tab.idx === this.activeTab.idx),
        1
      )

      const tabsLength = this.queryTabs.length
      if (tabsLength > 0) {
        this.setActiveTab(this.queryTabs[tabsLength - 1])
      }
    },
    updateTab(payload: AnyTabInfo) {
      const tab = this.currentTab
      Object.assign(tab, payload)
    },
    setActiveTab(payload: TabInfo) {
      const { idx } = payload
      const tab = this.queryTabs.find((tab) => tab.idx === idx)

      if (tab) {
        this.activeTab = tab
        this.activeTabIdx = idx
      }
    },
    saveTab() {
      const tab = this.activeTab

      if (tab) {
        tab.isSaved = true
      }
    },
  },
})