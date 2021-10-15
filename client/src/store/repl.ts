import { defineStore } from 'pinia'
import { h } from 'vue'

import { connectDB, getTableColumns, getDBSchema } from '../utils/services'
import { useDark } from '../composables/useDark'

type SQLITE_DB_SCHEMA_COLUMN = {
  name: string;
  type: string;
}
interface SQLITE_DB_SCHEMA {
  name: string
  columns: SQLITE_DB_SCHEMA_COLUMN[]
}

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
      schemas: [] as SQLITE_DB_SCHEMA[],
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
    dbSchemaTree: (state) => {
      // init database schema tree
      const initDatabaseSchemaTree = () => {
        const schemas = state.databaseInfo.schemas

        return schemas.map((table: any) => {
          return {
            label: table.name,
            key: table.name,
            children: table.columns.map((column: any) => {
              return {
                label: column.name,
                key: column.name,
                suffix: () => h('div', {}, { default: () => column.type }),
              }
            }),
          }
        })
      }

      const dbName = state.databaseInfo.activeDB
      const tableColumns = initDatabaseSchemaTree()

      return [
        {
          label: dbName,
          key: `root-${dbName}`,
          suffix: () =>
            h('div', {}, { default: () => `(${tableColumns.length})` }),
          children: tableColumns,
        },
      ]
    },
    editorHintInfo: (state) => {
      const dbSchemas = state.databaseInfo.schemas
      let schema = {} as any

      const tables = dbSchemas.map((table) => ({ label: table.name.toLowerCase() }))

      dbSchemas.forEach((table) => {
        schema[table.name.toLowerCase()] = table.columns.map((col) => ({ label: col.name.toLowerCase() }))
      })

      return {
        tables,
        schema,
      }
    },
    expandedKeys: (state) => {
      return [`root-${state.databaseInfo.activeDB}`]
    }
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
     * Get DB Schema
     */
    async getDBSchema() {
      this.databaseInfo.schemas = await getDBSchema()
    },
    /**
     * Initialize Table Columns
     */
    async initTableColumns() {
      const params = encodeURIComponent(this.tableInfo.activeTable)
      this.tableInfo.tableColumns = await getTableColumns(params)
    },
  },
})
