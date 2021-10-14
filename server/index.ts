import Koa from 'koa'
import body from 'koa-body'
import bodyParser from 'koa-bodyparser'
import cors from 'kcors'
import path from 'path'

import { logger } from './src/logger'
import { router } from './src/router'

export const app = new Koa()

// Let's log each successful interaction. We'll also log each error - but not here,
// that's be done in the json error-handling middleware
app.use(async (ctx, next) => {
  try {
    await next()
    logger.info(`${ctx.method} ${ctx.url} RESPONSE: ${ctx.response.status}`)
  } catch (error) {}
})

// return response time in X-Response-Time header
app.use(async function responseTime(ctx, next) {
  const t1 = Date.now()
  await next()
  const t2 = Date.now()
  ctx.set('X-Response-Time', `${Math.ceil(t2 - t1)}ms`)
  logger.info(`X-Response-Time ${Math.ceil(t2 - t1)}ms`)
})

// For cors with options
app.use(cors({ origin: '*' }))

// For managing body. We're only allowing json.
app.use(bodyParser({ enableTypes: ['json'] }))

app.use(body({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, 'public/database'),
    keepExtensions: true
  }
}))

app.use(router.routes())
app.use(router.allowedMethods())
