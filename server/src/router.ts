import Router from 'koa-router'
import dayjs from 'dayjs'
import { SqliteServer } from './controller'

const baseUrl = '/api/v1'

export const router = new Router()

const sqliteServer = new SqliteServer()

const hintMap = {
  query: 'You need provide `/:sql` argument for query page params.'
}

const routerHint = (ctx: any, path: string) => {
  ctx.body = {
    error: {
      code: 400,
      message: hintMap[path],
    },
  }
}

router.get('/', ctx => {
  ctx.body = {
    data: { message: 'SQL Query API', version: process.env.API_VERSION }
  }
})

router.get(`${baseUrl}/`, ctx => {
  ctx.body = {
    data: { message: 'SQL Query API', version: process.env.API_VERSION }
  }
})

router.get(`${baseUrl}/datetime`, ctx => {
  ctx.body = {
    data: { datetime: dayjs().format('YYYY-MM-DD HH:mm:ss') }
  }
})

router.get(`${baseUrl}/sqlite/connectDB`, (ctx) => routerHint(ctx, 'query'))
router.get(`${baseUrl}/sqlite/connectDB/:database`, sqliteServer.connectDB.bind(sqliteServer))

// get sqlite table columns
router.get(`${baseUrl}/sqlite/getTableColumns`, (ctx) => routerHint(ctx, 'query'))
router.get(`${baseUrl}/sqlite/getTableColumns/:sql`, sqliteServer.getTableColumns.bind(sqliteServer))

// execute sqlite query
router.get(`${baseUrl}/sqlite/execSQL`, (ctx) => routerHint(ctx, 'query'))
router.get(`${baseUrl}/sqlite/execSQL/:sql`, sqliteServer.retriveResult.bind(sqliteServer))

router.post(`${baseUrl}/sqlite/uploadDatabase`, sqliteServer.uploadDatabase.bind(sqliteServer))
