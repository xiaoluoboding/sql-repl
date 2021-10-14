import { Database, Statement } from 'better-sqlite3'
import { logger } from './logger'
import { SqliteClient } from './db'
// import { db } from './db'
import { resolve } from 'path'

class SqliteServer {
  private db: Database
  private stmt: Statement
  private isConnecting: boolean

  constructor() {
  }

  /**
   * 获取查询参数
   * @param ctx
   * @param next
   * @returns
   */
  static getRequestParams(ctx, next) {
    logger.info(`运行环境：${process.env.NODE_ENV}`)
    const { params } = ctx
    logger.info(`查询参数：${JSON.stringify(params)}`)
    const { sql, database } = params

    if (!sql && !database) {
      logger.error('INVALID_PARAMS')
      ctx.throw(400, 'INVALID_PARAMS')
    }

    next()

    return params
  }

  connectDB(ctx, next) {
    const { database } = SqliteServer.getRequestParams(ctx, next)
    console.log(database)
    this.db = new SqliteClient({
      // database: resolve(__dirname, './employees.db'),
      database: resolve(__dirname, database),
    })
    this.isConnecting = this.db.db.open

    console.log(this)

    ctx.body = {
      data: this.db
    }
  }

  getTableColumns(ctx, next) {
    const { sql } = SqliteServer.getRequestParams(ctx, next)
    logger.info(this.db)

    if (!this.isConnecting) {
      logger.error('DB_NOT_CONNECTED')
      ctx.throw(400, 'DB_NOT_CONNECTED')
    }
    
    const stmt = this.db.execSQL(sql)
    const res = stmt.columns()
    logger.info(this.stmt)
    logger.info(res)

    ctx.body = {
      total: res.length,
      data: res,
    }
  }

  retriveResult(ctx, next) {
    const { sql } = SqliteServer.getRequestParams(ctx, next)

    const stmt = this.db.execSQL(sql)
    const res = stmt.all()

    logger.info('sqlite3 execute query successed')

    ctx.body = {
      total: res.length,
      data: res,
    }
  }

  uploadDatabase(ctx, next) {
    const file = ctx.request.files.file
    ctx.body = {
      data: {
        file
      },
    }
  }
}

export { SqliteServer }