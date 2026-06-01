import { computed } from 'vue'

export const useSortedEvents = (events) => {
  return computed(() => {
    return [...events].sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
  })
}
