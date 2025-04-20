import { ref } from "@nuxtjs/composition-api"
export function useHideText() {
  const demoHeight = ref('300px')
  const hideText = (workflow, updateDemoHeight) => {
    if (workflow === 'live') {
      if (updateDemoHeight) {
        demoHeight.value = '385px'
      }
      return false
    } else {
      if (updateDemoHeight) {
        demoHeight.value = '385px'
      }
      return true
    }
  }
  return { hideText, demoHeight }
}