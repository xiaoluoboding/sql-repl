import { InjectionKey, Ref, inject } from 'vue'

export interface DATABASE_INFO {
  activeTable: string
  connected: boolean
  manualRun: boolean
}

export type AnyRecord = Record<string, any>
export const IS_DARKMODE: InjectionKey<Ref<boolean>> = Symbol()
export const SQL_QUERIES: InjectionKey<Ref<string>> = Symbol()
export const DATABASE_INFO: InjectionKey<Ref<DATABASE_INFO>> = Symbol()

export const injectStrict = <T>(key: InjectionKey<T>, fallback?: T) => {
  const resolved = inject(key, fallback)
  if (!resolved) {
    throw new Error(`Could not resolve ${key.description}`)
  }

  return resolved
}

