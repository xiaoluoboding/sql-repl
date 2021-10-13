import { defineStore } from 'pinia'
import dayjs from 'dayjs'

import { shortid } from '../utils'
import { AnyRecord } from '../types'

export interface Tab {
  id: string;
  idx: number;
  label: string;
  isSaved: boolean;
  savedAt: string;
}

export const useTabsStore = defineStore('tabs', {
  state: () => ({
    queryTabs: [
      {
        id: shortid(),
        idx: 1,
        label: 'Untitled',
        isSaved: false,
        savedAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
      },
    ] as Tab[],
    activeTab: {} as Tab,
    activeTabIdx: 1,
  }),

  getters: {
    currentTab: (state) =>
      state.queryTabs.find((tab) => tab.idx === state.activeTabIdx),
  },

  actions: {
    addTab() {
      const id = shortid()
      const idx =
        this.queryTabs.length === 0
          ? 1
          : Math.max(...this.queryTabs.map((tab) => tab.idx)) + 1
      const newTab = {
        id,
        idx,
        label: 'Untitled',
        isSaved: false,
        savedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
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
    updateTab(payload: AnyRecord) {
      const tab = this.currentTab
      Object.assign(tab, payload)
    },
    setActiveTab(payload: Tab) {
      const { idx } = payload
      const tab = this.queryTabs.find((tab) => tab.idx === idx)

      if (tab) {
        this.activeTab = tab
        this.activeTabIdx = idx
      }
    },
    saveTab() {
      const tab = this.currentTab

      if (tab) {
        tab.isSaved = true
      }
    },
  },
})