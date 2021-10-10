import { resolve } from 'path'

import { logger } from './logger'

class PuppeteerAPI {
  ctx: any

  constructor(ctx) {
    this.ctx = ctx
  }
}

export {
  PuppeteerAPI
}