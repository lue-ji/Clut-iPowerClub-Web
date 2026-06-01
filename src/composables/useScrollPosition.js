import { ref, onMounted, onUnmounted } from 'vue'

export const useScrollThreshold = (threshold = 50) => {
  const passedThreshold = ref(false)

  const handleScroll = () => {
    passedThreshold.value = window.scrollY > threshold
  }

  onMounted(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return passedThreshold
}
