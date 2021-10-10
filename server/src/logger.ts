import log4js from 'log4js'

log4js.configure({
  appenders: {
    file: {
      type: 'file',
      // filename: '/export/Logs/app.log',
      filename: 'logs/app.log',
      maxLogSize: 10485760,
      backups: 10,
    },
    errorFile: {
      type: 'file',
      // filename: '/export/Logs/errors.log'
      filename: 'logs/errors.log'
    },
    console: {
      type: 'stdout',
    },
  },
  categories: {
    development: {
      appenders: ['file', 'console'],
      level: 'all',
    },
    production: {
      appenders: ['file'],
      level: 'info',
    },
    default: {
      appenders: ['file'],
      level: 'info',
    },
  },
  pm2: true,
  pm2InstanceVar: 'INSTANCE_ID'
})

export const logger =
  process.env.NODE_ENV === 'development' ?
  log4js.getLogger('development') :
  log4js.getLogger('production')