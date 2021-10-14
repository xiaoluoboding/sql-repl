import { defineStore } from 'pinia'

import { connectDB, getTableColumns } from '../utils/services'
import { useDark } from '../composables/useDark'

export const useReplStore = defineStore({
  id: 'replStore',

  persist: {
    enabled: true,
  },

  state: () => ({
    isDarkmode: useDark(),
    databaseInfo: {
      name: '',
      type: 'sqlite',
      connected: false,
      activeDB: '',
    },
    tableInfo: {
      sqlQueries: '',
      activeTable: '',
      tableColumns: [],
      manualRun: false,
    },
  }),

  getters: {
    isDark: (state) => state.isDarkmode,
  },

  actions: {
    /**
     * Connected with Database
     */
    async connectDatabase() {
      if (this.databaseInfo.connected) {
        console.warn('Database already connected')
        return
      }
      const res = await connectDB(encodeURIComponent(this.databaseInfo.name))
      this.databaseInfo.name = res.db.name
      this.databaseInfo.connected = !!res
    },
    /**
     * Initialize Table Columns
     */
    async initTableColumns() {
      const params = encodeURIComponent(
        `select * from ${this.tableInfo.activeTable}`
      )
      this.tableInfo.tableColumns = await getTableColumns(params)
    },
  },
})
