import { ref, onMounted, onUnmounted, Ref, watch } from 'vue'

export function useDark(): Ref<boolean> {
  let mediaQuery: any = null

  if (typeof window !== 'undefined') {
    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  }

  const matches = ref(mediaQuery ? mediaQuery.matches : false)

  function handler(event: any) {
    matches.value = event.matches
  }

  onMounted(() => {
    if (!mediaQuery) {
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    }

    handler(mediaQuery)
    mediaQuery.addListener(handler)
  })

  onUnmounted(() => {
    mediaQuery.removeListener(handler)
  })

  watch(
    () => matches.value,
    (newVal) => {
      if (newVal && !document.body.classList.contains('dark')) {
        document.body.classList.add('dark')
      } else {
        document.body.classList.remove('dark')
      }
    },
    {
      immediate: true,
    }
  )

  return matches
}
