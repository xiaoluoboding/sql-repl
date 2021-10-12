import { InjectionKey, Ref, inject } from 'vue'

export type AnyRecord = Record<string, any>

export interface DATABASE_INFO {
  activeTable: string
  connected: boolean
  manualRun: boolean
  tableColumns: AnyRecord[]
}

export const IS_DARKMODE: InjectionKey<Ref<boolean>> = Symbol()

export const injectStrict = <T>(key: InjectionKey<T>, fallback?: T) => {
  const resolved = inject(key, fallback)
  if (!resolved) {
    throw new Error(`Could not resolve ${key.description}`)
  }

  return resolved
}

