import { createPinia } from 'pinia'
import persist from './pinia-persist'

const pinia = createPinia()
pinia.use(persist)

export default pinia
