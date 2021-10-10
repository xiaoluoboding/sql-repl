import SQLite, { Database, Statement } from 'better-sqlite3'

interface DB_CONFIG {
  database: string
}

export class SqliteClient {
  public db: Database

  constructor(dbConfig: DB_CONFIG) {
    this.db = new SQLite(dbConfig.database)

    const dbName = this.db.name.split('/').pop().replace('.db', '')

    const query = `
      SELECT * FROM sqlite_master
      WHERE type='table' AND name='${dbName}'
    `

    this.db.prepare(query)
  }

  execSQL(sql: string): Statement {
    return this.db.prepare(sql)
  }

  async closeDB(): Promise<void> {
    this.db.close()
  }
}

async function runWithConnection(dbConfig, run) {
  let db
  try {
    db = new SQLite(dbConfig.database)
    const results = await run(db)
    return results
  } finally {
    if (db) {
      db.close()
    }
  }
}

export { runWithConnection }