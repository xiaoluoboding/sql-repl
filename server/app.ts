import dotenv from 'dotenv'
import { app } from './index'

dotenv.config()

const env = process.env.NODE_ENV || 'development'
const isProd = process.env.NODE_ENV === 'production'
const port = process.env.PORT || (isProd ? 80 : 3232)
// Here we're assigning the server to a variable because
// we're going to want to manually rip down the server in testing
export const server = app.listen(port)

// eslint-disable-next-line no-console
console.log(`Server running at ${port}`)

// eslint-disable-next-line no-console
console.log(`Running in ${env}`)
